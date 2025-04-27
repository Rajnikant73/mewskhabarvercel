import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-text mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Maaf garchau, tapaile khojeko page vetiena. Kripaya arko link khojnuhos.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center button-primary px-6 py-3"
        >
          <Home size={20} className="mr-2" />
          <span>Homepage Ma Janus</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;