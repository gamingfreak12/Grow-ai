
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available, otherwise throw an error.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image using the Gemini API based on a text prompt.
 * @param prompt The text prompt to generate an image from.
 * @returns A promise that resolves to the base64 encoded image string.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    try {
        console.log(`Requesting image generation for prompt: "${prompt}"`);
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png', // Use PNG for better quality
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const image = response.generatedImages[0];
            if (image.image && image.image.imageBytes) {
                console.log("Image successfully generated and received.");
                return image.image.imageBytes;
            }
        }
        
        throw new Error("No image data received from the API.");

    } catch (error) {
        console.error('Error generating image with Gemini API:', error);
        // Provide a more user-friendly error message
        if (error instanceof Error && error.message.includes('API key not valid')) {
             throw new Error("Invalid API Key. Please check your configuration.");
        }
        throw new Error("The image generation service failed to respond.");
    }
};
