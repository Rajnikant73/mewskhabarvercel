import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Phone } from 'lucide-react';

interface RentalCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  facilities: string[];
  image: string;
  phone: string;
}

const RentalCard: React.FC<RentalCardProps> = ({ 
  id, 
  title, 
  location, 
  price, 
  facilities, 
  image,
  phone
}) => {
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:${phone}`;
  };

  return (
    <Link to={`/rentals/${id}`} className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="text-white text-lg font-semibold">
            Rs. {price.toLocaleString()}/month
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start">
          <Home size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-text line-clamp-2">{title}</h3>
        </div>
        <div className="flex items-start mt-2">
          <MapPin size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Facilities:</p>
          <div className="flex flex-wrap gap-1">
            {facilities.map((facility, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>
        <button 
          onClick={handleCall}
          className="mt-4 w-full button-action flex items-center justify-center"
        >
          <Phone size={16} className="mr-2" />
          Call Now
        </button>
      </div>
    </Link>
  );
};

export default RentalCard;