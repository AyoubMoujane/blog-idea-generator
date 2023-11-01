import type { NextApiRequest, NextApiResponse } from 'next';
import { generateBlogPost } from '../../utils/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { topic } = req.body;

  try {
    const post = await generateBlogPost(topic);
    res.status(200).json({ post });
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    res.status(500).json({ error: 'Failed to generate blog post.' });
  }
}