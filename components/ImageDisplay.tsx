
import React from 'react';
import { ImageIcon } from './icons/ImageIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="w-full aspect-square bg-gray-800 rounded-lg animate-pulse flex flex-col items-center justify-center border-2 border-dashed border-gray-600">
    <div className="text-gray-500 text-center">
      <p className="font-semibold mb-2">Generating your masterpiece...</p>
      <p className="text-sm">This may take a moment.</p>
    </div>
  </div>
);

const InitialState: React.FC = () => (
  <div className="w-full aspect-square bg-gray-800/50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-700 text-gray-500 p-4">
    <ImageIcon className="w-16 h-16 mb-4" />
    <h3 className="text-xl font-semibold text-gray-400">Your generated image will appear here</h3>
    <p className="text-center mt-2">Enter a prompt above and click "Generate Image" to start creating.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="w-full aspect-square bg-red-900/20 border-2 border-dashed border-red-500/50 rounded-lg flex flex-col items-center justify-center p-4 text-red-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 className="text-xl font-semibold">An Error Occurred</h3>
    <p className="text-center mt-2 text-sm">{message}</p>
  </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (imageUrl) {
    return (
      <div className="w-full aspect-square bg-black rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        <img
          src={imageUrl}
          alt="AI Generated"
          className="w-full h-full object-contain transition-opacity duration-500 opacity-0"
          onLoad={(e) => (e.currentTarget.style.opacity = '1')}
        />
      </div>
    );
  }

  return <InitialState />;
};
