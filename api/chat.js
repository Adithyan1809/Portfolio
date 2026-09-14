export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: { 
          message: 'GEMINI_API_KEY not configured. Please add GEMINI_API_KEY to your environment variables.' 
        } 
      });
    }

    const { messages } = req.body;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
        messages: messages,
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: { message: error.message || 'Internal Server Error' } });
  }
}
