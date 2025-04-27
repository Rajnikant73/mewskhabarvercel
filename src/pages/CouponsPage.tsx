import React, { useState } from 'react';
import CouponCard from '../components/CouponCard';
import { dummyCouponData } from '../data/couponData';
import { Search, Tag } from 'lucide-react';

const CouponsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = ['All', 'Food', 'Shopping', 'Entertainment', 'Services', 'Travel'];
  
  const filteredCoupons = dummyCouponData.filter(coupon => {
    const matchesSearch = coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          coupon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          coupon.store.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
                          coupon.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Special Offers</h1>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Offer, Coupon, Discount Khojnuhos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Tag size={16} className="text-primary" />
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category || (category === 'All' && selectedCategory === '')
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredCoupons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoupons.map((coupon) => (
            <CouponCard 
              key={coupon.id}
              id={coupon.id}
              title={coupon.title}
              description={coupon.description}
              expiryDate={coupon.expiryDate}
              image={coupon.image}
              discount={coupon.discount}
              store={coupon.store}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">Coupon Vetiyena</h3>
          <p className="text-gray-500 mt-2">Kripaya arko keyword le khojnuhos.</p>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;