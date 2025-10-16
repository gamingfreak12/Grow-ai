import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const examplePrompts = [
    "A photorealistic image of a majestic lion wearing a crown, on a throne in a lush jungle",
    "An oil painting of a futuristic cityscape at sunset, with flying cars and neon lights",
    "A cute, fluffy robot exploring a garden of giant, glowing mushrooms, digital art",
    "A tranquil Japanese zen garden with a cherry blossom tree and a koi pond, watercolor style",
  ];

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const base64Data = await generateImage(prompt);
      if (base64Data) {
        const dataUrl = `data:image/png;base64,${base64Data}`;
        setImageUrl(dataUrl);
      } else {
        throw new Error("The API returned an empty image.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error("Image generation failed:", errorMessage);
      setError(`Failed to generate image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleSelectExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparklesIcon className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Grow AI
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Bring your creative visions to life with the power of AI.</p>
        </header>

        <main className="flex flex-col gap-8">
          <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700 backdrop-blur-sm">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-3">Or try an example:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {examplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectExample(p)}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {p.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} error={error} />
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Grow AI. Powered by Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;