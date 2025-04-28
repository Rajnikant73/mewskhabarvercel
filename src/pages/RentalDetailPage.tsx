import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRentals } from '../api/getRentals';
import { Phone, MapPin, Calendar, Home as HomeIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import NotFoundPage from './NotFoundPage';

interface RentalItem {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      { source_url: string }
    ];
  };
}

const RentalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rental, setRental] = useState<RentalItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRental() {
      try {
        const data = await getRentals();
        const found = data.find((item: RentalItem) => String(item.id) === id);
        setRental(found || null);
      } catch (error) {
        console.error('Error fetching rental:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRental();
  }, [id]);

  const handleCall = () => {
    window.location.href = `tel:9818553941`; // Placeholder number
  };

  if (loading) {
    return <div className="text-center mt-10">Loading rental details...</div>;
  }

  if (!rental) {
    return <NotFoundPage />;
  }

  const featuredImage = rental._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400.png?text=Rental+Image';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/rentals" className="flex items-center text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          <span>Sab Room Listing Ma Janus</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
          {/* Image Section */}
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            <img
              src={featuredImage}
              alt={rental.title.rendered}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info Section */}
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-start">
              <HomeIcon size={20} className="text-primary mt-1 mr-2 flex-shrink-0" />
              <h1
                className="text-2xl font-bold text-text"
                dangerouslySetInnerHTML={{ __html: rental.title.rendered }}
              />
            </div>

            <div className="flex items-start mt-4">
              <MapPin size={20} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-gray-700">Location: Bhairahawa</p>
            </div>

            <div className="mt-4 flex items-center">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <p className="text-gray-600">
                Posted on: {new Date(rental.date).toLocaleDateString('en-NP')}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-2xl font-bold text-primary">Rs. 22,000 (Negotiable)</p>
              <p className="text-sm text-accent mt-1">Price is negotiable</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Facilities:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-action mr-2" />
                  <span className="text-gray-700">2BHK Flat</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-action mr-2" />
                  <span className="text-gray-700">Parking Space</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCall}
              className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
            >
              <Phone size={20} className="mr-2" />
              Call Now
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Description:</h3>
          <div
            className="text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: rental.content.rendered }}
          />
        </div>
      </div>
    </div>
  );
};

export default RentalDetailPage;