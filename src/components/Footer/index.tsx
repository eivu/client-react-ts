import React from 'react';
import { Player } from '../Player';
const Footer: React.FC = () => {
  return (
    // <footer className="fixed inset-x-0 bottom-0 bg-gray-200 text-center py-4 text-gray-700">
    // <footer className="bg-gray-200 text-center py-4 text-gray-700">
    // <footer className="bg-gray-800 text-center p-4">
    <footer className="sticky inset-x-0 bottom-0 text-center py-4">
      <Player />
    </footer>
  );
};

export default Footer;
