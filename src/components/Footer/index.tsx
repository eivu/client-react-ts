// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="container mx-auto" style={{color: 'black'}}>
        <h3>MP3 controls go here</h3>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Follow us on
          <a href="https://twitter.com" className="text-blue-500 hover:underline ml-1">
            Twitter
          </a>,
          <a href="https://facebook.com" className="text-blue-700 hover:underline ml-1">
            Facebook
          </a>, and
          <a href="https://instagram.com" className="text-pink-500 hover:underline ml-1">
            Instagram
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
