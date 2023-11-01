import { useState } from 'react';
import { generateBlogIdea } from '../api/generateIdea';

const HomePage = () => {
  const [topic, setTopic] = useState('');
  const [idea, setIdea] = useState('');

  const handleGenerateIdea = async () => {
    if (topic.trim() === '') return;
    const generatedIdea = await generateBlogIdea(topic);
    setIdea(generatedIdea);
  };

  return (
    <div>
      <h1>Blog Idea Generator</h1>
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
