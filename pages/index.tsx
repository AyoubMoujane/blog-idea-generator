import { OpenAiService } from '@/services/openai';
import { useState } from 'react';

const HomePage = () => {
  const [topic, setTopic] = useState('');
  const [idea, setIdea] = useState('');

  const handleGenerateIdea = async () => {
    if (topic.trim() !== '') {
      try {
        const blogIdea = await OpenAiService.generateBlogPost(topic);
        setIdea(blogIdea || "");
      } catch (error) {
        // Handle or display error to the user
      }
    }
  };

  return (
    <div>
      <h1>Blog Idea Generator 💡✏️</h1>
      <div>
        <label>Enter a topic:</label>
        <input 
          type="text" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
        />
        <button onClick={handleGenerateIdea}>Generate Idea</button>
      </div>
      {idea && (
        <div>
          <h2>Blog Idea:</h2>
          <p>{idea}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;