import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import RentalCard from '../components/RentalCard';
import CouponCard from '../components/CouponCard';
import { dummyNewsData } from '../data/newsData';
import { dummyRentalData } from '../data/rentalData';
import { dummyCouponData } from '../data/couponData';
import { Newspaper, Home, Tag, Search as SearchIcon } from 'lucide-react';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const filteredNews = dummyNewsData.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRentals = dummyRentalData.filter(rental => 
    rental.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    rental.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCoupons = dummyCouponData.filter(coupon => 
    coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.store.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalResults = filteredNews.length + filteredRentals.length + filteredCoupons.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Search Results</h1>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Khoji Rahal Bani News, Room, ya Discount?"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
            aria-label="Search"
          >
            <SearchIcon size={20} />
          </button>
        </form>
      </div>
      
      {query && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found {totalResults} results for "{query}"
          </p>
        </div>
      )}
      
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            className={`px-4 py-2 flex items-center space-x-1 border-b-2 ${
              activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-600'
            }`}
            onClick={() => setActiveTab('all')}
          >
            <span>All ({totalResults})</span>
          </button>
          <button
            className={`px-4 py-2 flex items-center space-x-1 border-b-2 ${
              activeTab === 'news' ? 'border-primary text-primary' : 'border-transparent text-gray-600'
            }`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper size={16} />
            <span>News ({filteredNews.length})</span>
          </button>
          <button
            className={`px-4 py-2 flex items-center space-x-1 border-b-2 ${
              activeTab === 'rentals' ? 'border-primary text-primary' : 'border-transparent text-gray-600'
            }`}
            onClick={() => setActiveTab('rentals')}
          >
            <Home size={16} />
            <span>Rentals ({filteredRentals.length})</span>
          </button>
          <button
            className={`px-4 py-2 flex items-center space-x-1 border-b-2 ${
              activeTab === 'coupons' ? 'border-primary text-primary' : 'border-transparent text-gray-600'
            }`}
            onClick={() => setActiveTab('coupons')}
          >
            <Tag size={16} />
            <span>Coupons ({filteredCoupons.length})</span>
          </button>
        </div>
      </div>
      
      {totalResults > 0 ? (
        <div>
          {(activeTab === 'all' || activeTab === 'news') && filteredNews.length > 0 && (
            <section className="mb-10">
              {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4 flex items-center"><Newspaper size={20} className="mr-2" /> News</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredNews.slice(0, activeTab === 'all' ? 4 : undefined).map((news) => (
                  <NewsCard 
                    key={news.id}
                    id={news.id}
                    title={news.title}
                    excerpt={news.excerpt}
                    image={news.image}
                    date={news.date}
                    category={news.category}
                  />
                ))}
              </div>
              {activeTab === 'all' && filteredNews.length > 4 && (
                <div className="mt-4 text-center">
                  <button 
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => setActiveTab('news')}
                  >
                    View all {filteredNews.length} news results
                  </button>
                </div>
              )}
            </section>
          )}
          
          {(activeTab === 'all' || activeTab === 'rentals') && filteredRentals.length > 0 && (
            <section className="mb-10">
              {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4 flex items-center"><Home size={20} className="mr-2" /> Rentals</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRentals.slice(0, activeTab === 'all' ? 4 : undefined).map((rental) => (
                  <RentalCard 
                    key={rental.id}
                    id={rental.id}
                    title={rental.title}
                    location={rental.location}
                    price={rental.price}
                    facilities={rental.facilities}
                    image={rental.image}
                    phone={rental.phone}
                  />
                ))}
              </div>
              {activeTab === 'all' && filteredRentals.length > 4 && (
                <div className="mt-4 text-center">
                  <button 
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => setActiveTab('rentals')}
                  >
                    View all {filteredRentals.length} rental results
                  </button>
                </div>
              )}
            </section>
          )}
          
          {(activeTab === 'all' || activeTab === 'coupons') && filteredCoupons.length > 0 && (
            <section className="mb-10">
              {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4 flex items-center"><Tag size={20} className="mr-2" /> Coupons</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCoupons.slice(0, activeTab === 'all' ? 4 : undefined).map((coupon) => (
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
              {activeTab === 'all' && filteredCoupons.length > 4 && (
                <div className="mt-4 text-center">
                  <button 
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => setActiveTab('coupons')}
                  >
                    View all {filteredCoupons.length} coupon results
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">Kehi Vetiyena</h3>
          <p className="text-gray-500 mt-2">Kripaya arko keyword le khojnuhos.</p>
          <Link to="/" className="mt-6 inline-block button-primary">
            Homepage Ma Janus
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;