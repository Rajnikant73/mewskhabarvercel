import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink } from 'lucide-react'; // 🧹 Clean import – Tag removed

interface CouponCardProps {
  id: string;
  title: string;
  description: string;
  expiryDate: string;
  image: string;
  discount: string;
  store: string;
}

const CouponCard: React.FC<CouponCardProps> = ({ 
  id, 
  title, 
  description, 
  expiryDate, 
  image,
  discount,
  store
}) => {
  return (
    <Link to={`/coupons/${id}`} className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border-2 border-offer/30">
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 p-2"
        />
        <div className="absolute top-2 right-2 bg-offer text-text text-xs font-bold px-2 py-1 rounded-full">
          {discount}
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600">{store}</div>
        <h3 className="text-lg font-semibold text-text mt-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Calendar size={14} className="mr-1" />
          <span>Valid until: {expiryDate}</span>
        </div>
        <button className="mt-4 w-full button-action flex items-center justify-center">
          <ExternalLink size={16} className="mr-2" />
          Use Offer
        </button>
      </div>
    </Link>
  );
};

export default CouponCard;