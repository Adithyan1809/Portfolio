import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev middleware plugin for /api/chat during `npm run dev`
function devChatApiPlugin() {
  return {
    name: 'dev-chat-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          const env = loadEnv(server.config.mode, process.cwd(), '');
          const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

          if (!apiKey) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
              error: { message: 'GEMINI_API_KEY not configured in .env file.' }
            }));
          }

          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { messages } = JSON.parse(body);
              const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                  model: env.GEMINI_MODEL || 'gemini-1.5-flash',
                  messages: messages,
                  temperature: 0.7,
                  max_tokens: 200
                })
              });

              const data = await geminiRes.json();
              res.statusCode = geminiRes.status;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify(data));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: { message: err.message || 'Internal Server Error' } }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devChatApiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('@xyflow')) {
              return 'vendor-xyflow';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  }
})
