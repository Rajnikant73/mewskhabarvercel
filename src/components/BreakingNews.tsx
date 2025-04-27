import React from 'react';
import { AlertTriangle } from 'lucide-react';

const BreakingNews: React.FC = () => {
  return (
    <div className="bg-accent text-white py-2 ticker-container">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center bg-white text-accent px-2 py-1 rounded mr-4">
          <AlertTriangle size={16} className="mr-1" />
          <span className="text-xs font-semibold">BREAKING</span>
        </div>
        <div className="ticker-text">
          Breaking: Bhairahawa Airport Expansion Suru Bhayo! | Butwal Ma Naya Shopping Mall Khulcha | Lumbini Ma International Tourist Sankhya Badhyo
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;