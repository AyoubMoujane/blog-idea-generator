import { BlogPost } from "@/utils/openai";

export const OpenAiService = {
    async generateBlogPost(topic: string): Promise<BlogPost> {
      try {
        const response = await fetch('/api/generateBlogPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        return data.post || null;
      } catch (error) {
        console.error('Failed to fetch blog idea:', error);
        throw error; // Re-throw the error for handling in the component or any other caller
      }
    }
  }