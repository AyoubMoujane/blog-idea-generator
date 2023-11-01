import React from 'react';
import { OpenAiService } from '@/services/openai';
import BlogPostCard from '../components/BlogPostCard'; // Import the BlogPostCard component and its typing
import { useState } from 'react';
import { BlogPost } from '@/utils/openai';

const HomePage = () => {
  const [topic, setTopic] = useState('');
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null); // Use BlogPost type
  const [loading, setLoading] = useState(false);

  const handleGenerateIdea = async () => {
    if (topic.trim() !== '') {
      setLoading(true);
      try {
        const generatedBlogPost = await OpenAiService.generateBlogPost(topic); // This should return a full BlogPost object
        setBlogPost(generatedBlogPost);
      } catch (error) {
        // Handle or display error to the user
        console.error("Error generating the blog post:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <h1 className="text-xl font-bold mb-4">Blog Idea Generator 💡✏️</h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Enter a topic:</label>
          <input 
            type="text"
            className="p-2 border rounded"
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
          />
        </div>
        <button 
          onClick={handleGenerateIdea}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Idea"}
        </button>
      </div>
      {blogPost && <BlogPostCard blogPost={blogPost} />} {/* Use the BlogPostCard component to display the generated blog post */}
    </div>
  );
};

export default HomePage;