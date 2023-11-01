import { BlogPost } from '@/utils/openai';
import React from 'react';

const BlogPostCard = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="py-4 px-6">
        <h2 className="text-2xl font-bold mb-4">{blogPost.title}</h2>
        {[blogPost.paragraph1, blogPost.paragraph2, blogPost.paragraph3].map((paragraph, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{paragraph.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{paragraph.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostCard;
