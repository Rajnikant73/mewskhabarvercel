import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag as TagIcon, MapPin, Copy, ArrowLeft } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import NotFoundPage from './NotFoundPage';

interface CouponItem {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string }; // ✨ Added for full description
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      { source_url: string }
    ];
  };
}

const CouponDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coupon, setCoupon] = useState<CouponItem | null>(null);
  const [relatedCoupons, setRelatedCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoupon() {
      try {
        const res = await fetch(`https://news.mewskhabar.com/wp-json/wp/v2/coupon/${id}?_embed`);
        const data = await res.json();
        setCoupon(data);

        const relatedRes = await fetch(`https://news.mewskhabar.com/wp-json/wp/v2/coupon?_embed`);
        const relatedData = await relatedRes.json();
        const related = relatedData.filter((item: CouponItem) => item.id !== Number(id)).slice(0, 3);
        setRelatedCoupons(related);
      } catch (error) {
        console.error('Error fetching coupon details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoupon();
  }, [id]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NO-CODE-NEEDED');
    alert('Coupon code copied to clipboard!');
  };

  if (loading) {
    return <div className="text-center mt-10">Loading coupon details...</div>;
  }

  if (!coupon) {
    return <NotFoundPage />;
  }

  const imageUrl = coupon._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400.png?text=Coupon+Image';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/coupons" className="flex items-center text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          <span>Sab Offers Ma Janus</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
          {/* Left: Image */}
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-100">
          <img
  src={imageUrl}
  alt={coupon?.title?.rendered || 'Coupon Image'}
  className="object-cover w-full h-auto max-h-[400px] mx-auto"
/>
          </div>

          {/* Right: Details */}
          <div className="p-6 flex flex-col justify-center">
            <div className="text-sm text-gray-600 mb-1">Local Store</div>
            <h1
              className="text-2xl font-bold text-text"
              dangerouslySetInnerHTML={{ __html: coupon?.title?.rendered }}
            />

            <div className="mt-4 bg-offer/20 text-primary p-3 rounded-lg text-lg font-bold">
              10% OFF
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span>Valid until: 31 Dec 2025</span>
            </div>

            <div className="mt-4 flex items-start text-sm text-gray-700">
              <TagIcon size={16} className="text-gray-500 mt-1 mr-2" />
              <span>Food</span>
            </div>

            <div className="mt-4 flex items-start text-sm text-gray-700">
              <MapPin size={16} className="text-gray-500 mt-1 mr-2" />
              <p>Milan Chowk, Butwal</p>
            </div>

            <button
              onClick={handleCopyCode}
              className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
            >
              <Copy size={20} className="mr-2" />
              Copy Offer Code
            </button>
          </div>
        </div>

        {/* Full Description */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Description:</h3>
          <div
            className="text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: coupon?.content?.rendered || '' }}
          />
        </div>
      </div>

      {/* Related Coupons */}
      {relatedCoupons.length > 0 && (
        <div className="mt-12">
          <h2 className="section-heading text-2xl font-bold text-text mb-6">Similar Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCoupons.map((related) => (
              <CouponCard 
                key={related.id}
                id={related.id.toString()}
                title={related.title?.rendered || ''}
                description={related.excerpt?.rendered || ''}
                expiryDate={'31 Dec 2025'}
                image={related._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
                discount={'10% OFF'}
                store={'Local Store'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponDetailPage;