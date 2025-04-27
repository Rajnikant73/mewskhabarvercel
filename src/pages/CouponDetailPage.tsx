import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyCouponData } from '../data/couponData';
import { Calendar, Tag as TagIcon, MapPin, ExternalLink, Copy, ArrowLeft } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import NotFoundPage from './NotFoundPage';

const CouponDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const coupon = dummyCouponData.find(coupon => coupon.id === id);
  
  const relatedCoupons = dummyCouponData
    .filter(item => item.id !== id && item.category === coupon?.category)
    .slice(0, 3);
  
  if (!coupon) {
    return <NotFoundPage />;
  }

  const handleCopyCode = () => {
    if (coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      alert('Coupon code copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/coupons" className="flex items-center text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          <span>Sab Offers Ma Janus</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-offer/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[250px] md:h-full bg-gray-50 flex items-center justify-center p-6">
            <img 
              src={coupon.image} 
              alt={coupon.title} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="p-6">
            <div className="text-sm text-gray-600 mb-1">{coupon.store}</div>
            <h1 className="text-2xl font-bold text-text mb-4">{coupon.title}</h1>
            
            <div className="bg-offer/20 text-text p-3 rounded-lg font-bold text-xl mb-4">
              {coupon.discount}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar size={16} className="mr-1" />
              <span>Valid until: {coupon.expiryDate}</span>
            </div>
            
            <div className="flex items-start mb-4">
              <TagIcon size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{coupon.category}</span>
            </div>
            
            {coupon.location && (
              <div className="flex items-start mb-6">
                <MapPin size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-700">{coupon.location}</p>
              </div>
            )}
            
            {coupon.code ? (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Coupon Code:</p>
                <div className="flex">
                  <div className="bg-gray-100 border border-gray-300 flex-grow py-2 px-4 rounded-l-lg font-mono font-medium">
                    {coupon.code}
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="bg-primary text-white p-2 rounded-r-lg hover:bg-blue-600"
                    aria-label="Copy coupon code"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <button className="mt-6 w-full button-action flex items-center justify-center py-3">
                <ExternalLink size={20} className="mr-2" />
                Use Offer
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Description:</h3>
          <p className="text-gray-700 mb-4">
            {coupon.description}
          </p>
          
          {coupon.details && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Terms & Conditions:</h3>
              <div className="text-gray-700 space-y-1">
                {coupon.details.map((detail, index) => (
                  <p key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {relatedCoupons.length > 0 && (
        <div className="mt-12">
          <h2 className="section-heading text-2xl font-bold text-text mb-6">Similar Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCoupons.map((related) => (
              <CouponCard 
                key={related.id}
                id={related.id}
                title={related.title}
                description={related.description}
                expiryDate={related.expiryDate}
                image={related.image}
                discount={related.discount}
                store={related.store}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponDetailPage;