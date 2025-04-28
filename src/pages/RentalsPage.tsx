import React, { useEffect, useState } from 'react';
import RentalCard from '../components/RentalCard';
import { getRentals } from '../api/getRentals';
import { Search, MapPin, ArrowDownUp } from 'lucide-react';

interface RentalItem {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media?: number; // 🔥 added to plan for featured image later
  _embedded?: any; // 🔥 optional: when we fetch full media image
}

const RentalsPage: React.FC = () => {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('');

  const locations = ['All', 'Butwal', 'Bhairahawa', 'Lumbini'];
  const sortOptions = [
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  useEffect(() => {
    async function fetchRentals() {
      try {
        const data = await getRentals();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRentals();
  }, []);

  let filteredRentals = rentals.filter((rental) => {
    const title = rental.title.rendered.toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === '' ||
      selectedLocation === 'All' ||
      title.includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  if (sortBy === 'newest') {
    filteredRentals = [...filteredRentals].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  if (loading) {
    return <div className="text-center mt-10">Loading rentals...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Room/Flat Rentals</h1>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Room, Flat, Hostel Khojnuhos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <MapPin size={16} className="text-primary" />
            {locations.map((location) => (
              <button
                key={location}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedLocation === location || (location === 'All' && selectedLocation === '')
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedLocation(location === 'All' ? '' : location)}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="flex items-center">
            <ArrowDownUp size={16} className="text-gray-500 mr-2" />
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredRentals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRentals.map((rental) => {
            const imageUrl = rental._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            return (
              <RentalCard
                key={rental.id}
                id={String(rental.id)}
                title={rental.title.rendered}
                location="Bhairahawa" // Placeholder now
                price={22000} // 🔥 Temporary fixed price, later dynamic from API
                facilities={['2BHK Flat', 'Parking Space']} // 🔥 Placeholder for now
                image={imageUrl}
                phone="9818553941" // 🔥 Placeholder for now
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">Room/Flat भेटिएन</h3>
          <p className="text-gray-500 mt-2">कृपया अर्को keyword ले खोज्नुहोस्।</p>
        </div>
      )}
    </div>
  );
};

export default RentalsPage;