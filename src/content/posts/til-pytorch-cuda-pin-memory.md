---
title: "TIL: Why pin_memory=True in PyTorch Caused Intermittent CUDA Bus Errors"
date: "2026-10-22"
readTime: "2 min read"
type: "TIL"
tags: ["PyTorch", "CUDA", "Debugging", "TIL"]
excerpt: "A 2-minute debugging war story on memory locking, Linux /dev/shm exhaustion, and how pin_memory=True can crash multi-worker DataLoaders."
---

If your multi-GPU training job or batch inference script randomly crashes with:
```
RuntimeError: CUDA error: out of memory
or
Bus error (core dumped)
```
...and your `nvidia-smi` shows you still have 10GB+ of free GPU VRAM, check your **host pinned memory (`/dev/shm`)**, not your GPU memory.

---

### The Root Cause

Setting `pin_memory=True` instructs PyTorch to allocate page-locked (pinned) host memory:

```python:train.py
loader = DataLoader(
    dataset,
    batch_size=64,
    shuffle=True,
    num_workers=8,     # 8 child processes
    pin_memory=True    # Allocates page-locked host memory
)
```

1. Pinned memory bypasses the OS virtual memory paging system, enabling asynchronous direct memory access (DMA) transfers between host RAM and GPU via PCIe.
2. However, multi-worker PyTorch DataLoaders pass tensors between worker processes using **shared memory (`/dev/shm`)**.
3. In Docker containers, Kubernetes pods, or certain cloud instances, `/dev/shm` defaults to only **64MB** unless explicitly configured!
4. When 8 workers attempt to allocate batches of pinned 1080p tensors into a 64MB shared memory volume, Linux sends `SIGBUS` to the process.

> [!TIP]
> If running inside Docker, always pass `--shm-size=16gb` or `--ipc=host` to avoid shared memory starvation:
> ```bash
> docker run --gpus all --shm-size=16g my-pytorch-image:latest
> ```

---

### The Fix in Code

If you cannot modify the container host flags, safely fallback using a system check before enabling `pin_memory`:

```python:utils/hardware.py
import os
import torch
from torch.utils.data import DataLoader

def get_safe_loader(dataset, batch_size=32):
    # Check free shared memory in /dev/shm
    shm_stat = os.statvfs('/dev/shm')
    free_shm_gb = (shm_stat.f_bavail * shm_stat.f_frsize) / (1024 ** 3)
    
    use_pin = torch.cuda.is_available() and free_shm_gb > 4.0
    
    return DataLoader(
        dataset,
        batch_size=batch_size,
        num_workers=min(4, os.cpu_count() or 1),
        pin_memory=use_pin
    )
```

No more random SIGBUS aborts during epoch transitions!
