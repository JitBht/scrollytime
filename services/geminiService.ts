
import { GoogleGenAI, Type } from "@google/genai";
import type { Story } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storySchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'A catchy, kid-friendly title for the story.',
      },
      story: {
        type: Type.STRING,
        description: 'A short moral story (2-3 paragraphs) for a child between 6 and 12 years old.',
      },
      imagePrompt: {
        type: Type.STRING,
        description: 'A simple, descriptive prompt for an illustration in a vibrant, Pixar-like 3D animation style. Focus on characters and setting.',
      },
    },
    required: ["title", "story", "imagePrompt"],
  },
};

interface StoryIdea {
  title: string;
  story: string;
  imagePrompt: string;
}

export const generateStories = async (): Promise<Story[]> => {
  try {
    const storyIdeasResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 unique, simple moral story ideas for children aged 6-12. The stories should be about topics like friendship, honesty, courage, or kindness.",
      config: {
        responseMimeType: "application/json",
        responseSchema: storySchema,
        temperature: 1,
      },
    });

    const storyIdeas: StoryIdea[] = JSON.parse(storyIdeasResponse.text);

    if (!Array.isArray(storyIdeas) || storyIdeas.length === 0) {
        throw new Error("Failed to generate valid story ideas.");
    }

    const storyPromises = storyIdeas.map(async (idea, index) => {
      const imageResponse = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: `${idea.imagePrompt}, vibrant colors, cinematic lighting, 3D animated movie style`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '9:16',
        },
      });

      if (!imageResponse.generatedImages || imageResponse.generatedImages.length === 0) {
        throw new Error(`Failed to generate image for story: ${idea.title}`);
      }

      const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

      return {
        id: `${Date.now()}-${index}`,
        title: idea.title,
        story: idea.story,
        imageUrl: imageUrl,
      };
    });

    return await Promise.all(storyPromises);
  } catch (error) {
    console.error("Error in Gemini Service:", error);
    throw new Error("Failed to communicate with the AI to generate stories.");
  }
};
