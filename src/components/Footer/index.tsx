import React from 'react';

const Footer: React.FC = () => {
  return (
    // <footer className="fixed inset-x-0 bottom-0 bg-gray-200 text-center py-4 text-gray-700">
    // <footer className="bg-gray-200 text-center py-4 text-gray-700">
    // <footer className="bg-gray-800 text-center p-4">
    <footer className="sticky inset-x-0 bottom-0 text-center py-4">
      <div className="container mx-auto" style={{color: 'black'}}>
        <h3>MP3 controls go here</h3>
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
