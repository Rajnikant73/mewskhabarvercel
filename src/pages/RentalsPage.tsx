import React, { useState } from 'react';
import RentalCard from '../components/RentalCard';
import { dummyRentalData } from '../data/rentalData';
import { Search, MapPin, ArrowDownUp } from 'lucide-react';

const RentalsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  const locations = ['All', 'Butwal', 'Bhairahawa', 'Lumbini'];
  const sortOptions = [
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];
  
  let filteredRentals = dummyRentalData.filter(rental => {
    const matchesSearch = rental.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rental.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All' || 
                          rental.location.includes(selectedLocation);
    
    return matchesSearch && matchesLocation;
  });
  
  // Sorting
  if (sortBy === 'price_low') {
    filteredRentals = [...filteredRentals].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    filteredRentals = [...filteredRentals].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredRentals = [...filteredRentals].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
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
            {locations.map(location => (
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
              {sortOptions.map(option => (
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
          {filteredRentals.map((rental) => (
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
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">Room/Flat Vetiyena</h3>
          <p className="text-gray-500 mt-2">Kripaya arko keyword le khojnuhos.</p>
        </div>
      )}
    </div>
  );
};

export default RentalsPage;