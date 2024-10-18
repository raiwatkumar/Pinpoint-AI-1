import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, highlightedText } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    let prompt = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));

    if (highlightedText) {
      prompt.push({
        role: 'system',
        content: `The user has highlighted the following text: "${highlightedText}". Please consider this context when answering the next question.`,
      });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: prompt,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({ error: error.response.data.error || 'Failed to get response from AI' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred on the server' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});