import { OpenAI } from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function generateBlogPost(topic: string): Promise<string | null> {

    const openai = new OpenAI({apiKey: OPENAI_API_KEY});
    const promptContent = `Write a short 50 words blog post about ${topic}.`;

    const prompt : OpenAI.Chat.Completions.ChatCompletionMessageParam = {"role": "user", "content": promptContent}
    try {
        const response = await openai.chat.completions.create({
            messages: [prompt],
            model: "gpt-3.5-turbo",
        });
        return response.choices[0].message.content
    } catch (error) {
        console.error('Error generating blog post:', error);
        throw error;
    }
    
}

