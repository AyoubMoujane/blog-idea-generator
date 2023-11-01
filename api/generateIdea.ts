import axios from 'axios';

const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions'; // Replace with the appropriate ChatGPT API endpoint

export const generateBlogIdea = async (topic: string) => {
  try {
    const prompt = `Generate a blog post idea about ${topic}`;
    const response = await axios.post(API_ENDPOINT, {
      prompt: prompt,
      max_tokens: 100, // Adjust as needed
    }, {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`, // Replace with your API key
      },
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating blog idea:', error);
    return 'Error occurred while generating a blog idea.';
  }
};
