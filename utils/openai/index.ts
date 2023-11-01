import { OpenAI } from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export interface BlogPost {
    title: string,
    paragraph1: BlogPostParagraph,
    paragraph2: BlogPostParagraph,
    paragraph3: BlogPostParagraph,
}

export interface BlogPostParagraph {
    title: string,
    content:string,
}

export async function generateBlogPost(topic: string): Promise<BlogPost> {

    const openai = new OpenAI({apiKey: OPENAI_API_KEY});

    const promptContent = `
            Please generate a 100 words blog post about ${topic} with few emojis:

            And format the blog post into JSON object that respects the following interfaces

            interface BlogPost {
                title: string,
                paragraph1: Paragraph,
                paragraph2: Paragraph,
                paragraph3: Paragraph,
            }
            
            interface Paragraph {
                title: string,
                content:string,
            }
    `;

    const prompt : OpenAI.Chat.Completions.ChatCompletionMessageParam = {"role": "user", "content": promptContent}
    try {
        const response = await openai.chat.completions.create({
            messages: [prompt],
            model: "gpt-3.5-turbo",
        });
        if(response.choices[0].message.content) {
            const blogPost = JSON.parse(response.choices[0].message.content) as BlogPost
            return blogPost
        } else {
            throw new Error('Error generating blog post: received null content')
        }
    } catch (error) {
        console.error('Error generating blog post:', error);
        throw error;
    }
    
}

