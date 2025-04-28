import React, { useState, useEffect } from 'react';
import CouponCard from '../components/CouponCard';
import { Search, Tag } from 'lucide-react';
import { getCoupons } from '../api/getCoupons'; // 💥 Import your API function here

interface CouponItem {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      { source_url: string }
    ];
  };
}

const CouponsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  const categories = ['All', 'Food', 'Shopping', 'Entertainment', 'Services', 'Travel'];

  useEffect(() => {
    async function fetchCouponsData() {
      const data = await getCoupons();
      setCoupons(data);
      setLoadingCoupons(false);
    }
    fetchCouponsData();
  }, []);

  const filteredCoupons = coupons.filter(coupon => {
    const title = coupon.title.rendered || '';
    const description = coupon.excerpt.rendered || '';
    const store = ''; // No store field yet

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          store.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === '' || selectedCategory === 'All';
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Special Offers</h1>

      {/* Search & Category Filter */}
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

      {/* Coupons Grid */}
      {loadingCoupons ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">Loading Coupons...</h3>
        </div>
      ) : filteredCoupons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoupons.map((coupon) => (
            <CouponCard 
              key={coupon.id}
              id={coupon.id.toString()}
              title={coupon.title.rendered}
              description={coupon.excerpt.rendered}
              expiryDate={'31 Dec 2025'} // Static for now
              image={coupon._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
              discount={'10% OFF'}
              store={'Local Store'}
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