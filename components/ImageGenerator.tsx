import React, { useState } from 'react';
import { BlogPost } from '@/utils/openai';
import { OpenAiService } from '@/services/openai';
import OpenAI from 'openai';

interface GenerateImageButtonProps {
    blogPost: BlogPost;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({ blogPost }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<OpenAI.Images.Image | null>(null); // assuming the image is a URL

    const handleGenerateImage = async () => {
        setLoading(true);
        try {
            const generatedImage = await OpenAiService.generateImage(blogPost);
            setImage(generatedImage);
        } catch (error) {
            console.error("Error generating image:", error);
            // Handle or display error to the user, if needed
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleGenerateImage}
                disabled={loading}
            >
                {loading ? "Generating Image..." : "Generate Image"}
            </button>
            {image &&
                <div>
                    <img src={image.url} alt={blogPost.title} className="rounded-lg mb-4" />
                </div>
            }
        </div>
    );
};

export default GenerateImageButton;
