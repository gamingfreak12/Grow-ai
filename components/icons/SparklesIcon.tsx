
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" />
    <path d="M3 3v2" />
    <path d="M21 21v-2" />
    <path d="M3 21v-2" />
    <path d="M21 3v2" />
    <path d="M12 3V1" />
    <path d="M12 23v-2" />
    <path d="M21 12h2" />
    <path d="M1 12h2" />
  </svg>
);
