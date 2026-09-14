export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: { 
          message: 'GEMINI_API_KEY not configured. Please add GEMINI_API_KEY to your environment variables on Vercel or in .env.' 
        } 
      });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: 'Invalid messages array provided.' } });
    }

    const modelsToTry = [
      process.env.GEMINI_MODEL,
      'gemini-3.1-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.6-flash'
    ].filter(Boolean);

    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 300
          })
        });

        const data = await response.json();

        if (response.ok && data?.choices?.[0]?.message) {
          return res.status(200).json(data);
        }

        const errMsg = Array.isArray(data) ? data[0]?.error?.message : data?.error?.message;
        console.warn(`Model ${model} failed (${response.status}):`, errMsg);
        lastError = { status: response.status, message: errMsg || 'Model call failed' };
      } catch (err) {
        console.warn(`Model ${model} request exception:`, err.message);
        lastError = { status: 500, message: err.message };
      }
    }

    return res.status(lastError?.status || 500).json({
      error: { message: lastError?.message || 'Failed to generate response from Gemini API.' }
    });
  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: { message: error.message || 'Internal Server Error' } });
  }
}
