import type { NextApiRequest, NextApiResponse } from 'next';
import { generateBlogPostImage } from '../../utils/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { blogPost } = req.body;

  try {
    const image = await generateBlogPostImage(blogPost);
    res.status(200).json({ image });
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    res.status(500).json({ error: 'Failed to generate blog post.' });
  }
}