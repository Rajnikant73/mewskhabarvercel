import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyRentalData } from '../data/rentalData';
import { Phone, MapPin, Calendar, Home as HomeIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import RentalCard from '../components/RentalCard';
import NotFoundPage from './NotFoundPage';

const RentalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const rental = dummyRentalData.find(rental => rental.id === id);
  
  const relatedRentals = dummyRentalData
    .filter(item => item.id !== id && item.location.includes(rental?.location.split(',')[0] || ''))
    .slice(0, 3);
  
  if (!rental) {
    return <NotFoundPage />;
  }

  const handleCall = () => {
    window.location.href = `tel:${rental.phone}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/rentals" className="flex items-center text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          <span>Sab Room Listing Ma Janus</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[300px] md:h-full">
            <img 
              src={rental.image} 
              alt={rental.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-start">
              <HomeIcon size={20} className="text-primary mt-1 mr-2 flex-shrink-0" />
              <h1 className="text-2xl font-bold text-text">{rental.title}</h1>
            </div>
            
            <div className="flex items-start mt-4">
              <MapPin size={20} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-gray-700">{rental.location}</p>
            </div>
            
            <div className="mt-4 flex items-center">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <p className="text-gray-600">Posted on: {rental.postedAt}</p>
            </div>
            
            <div className="mt-6">
              <p className="text-2xl font-bold text-primary">Rs. {rental.price.toLocaleString()}/month</p>
              {rental.negotiable && (
                <p className="text-sm text-accent mt-1">Price is negotiable</p>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Facilities:</h3>
              <div className="grid grid-cols-2 gap-2">
                {rental.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle size={16} className="text-action mr-2" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleCall}
              className="mt-8 w-full button-action flex items-center justify-center py-3"
            >
              <Phone size={20} className="mr-2" />
              {rental.phone} - Call Now
            </button>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Description:</h3>
          <p className="text-gray-700">
            {rental.description || "No detailed description provided for this rental property."}
          </p>
          
          {rental.additionalInfo && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Additional Information:</h3>
              <p className="text-gray-700">{rental.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>
      
      {relatedRentals.length > 0 && (
        <div className="mt-12">
          <h2 className="section-heading text-2xl font-bold text-text mb-6">Similar Rentals Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRentals.map((related) => (
              <RentalCard 
                key={related.id}
                id={related.id}
                title={related.title}
                location={related.location}
                price={related.price}
                facilities={related.facilities}
                image={related.image}
                phone={related.phone}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalDetailPage;