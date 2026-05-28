import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import './CommandPalette.css';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-dialog" onClick={(e) => e.stopPropagation()}>
        <Command>
          <Command.Input placeholder="Type a command or search... (Esc to close)" autoFocus />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item onSelect={() => { navigate('/'); setOpen(false); }}>
                Home
              </Command.Item>
              <Command.Item onSelect={() => { navigate('/#about'); setOpen(false); }}>
                About
              </Command.Item>
              <Command.Item onSelect={() => { navigate('/#experience'); setOpen(false); }}>
                Experience
              </Command.Item>
              <Command.Item onSelect={() => { navigate('/#skills'); setOpen(false); }}>
                Skills
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Case Studies">
              <Command.Item onSelect={() => { navigate('/projects/resumepilot'); setOpen(false); }}>
                Project: ResumePilot
              </Command.Item>
              <Command.Item onSelect={() => { navigate('/projects/project-iris'); setOpen(false); }}>
                Project: Project IRIS
              </Command.Item>
              <Command.Item onSelect={() => { navigate('/projects/mustering-system'); setOpen(false); }}>
                Project: Mustering System
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Socials">
              <Command.Item onSelect={() => { window.open('https://github.com/Adithyan1809', '_blank'); setOpen(false); }}>
                GitHub
              </Command.Item>
              <Command.Item onSelect={() => { window.open('https://linkedin.com/in/adithyan-prakash', '_blank'); setOpen(false); }}>
                LinkedIn
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
