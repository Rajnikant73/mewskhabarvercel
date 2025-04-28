import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag as TagIcon, MapPin, Copy, ArrowLeft } from 'lucide-react';
import CouponCard from '../components/CouponCard';
import NotFoundPage from './NotFoundPage';

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

        // Fetch related coupons
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
    navigator.clipboard.writeText('NO-CODE-NEEDED'); // static or you can improve later
    alert('Coupon code copied to clipboard!');
  };

  if (loading) {
    return <div className="text-center mt-10">Loading coupon details...</div>;
  }

  if (!coupon) {
    return <NotFoundPage />;
  }

  const imageUrl = coupon._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

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
              src={imageUrl} 
              alt={coupon.title.rendered} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <div className="p-6">
            <div className="text-sm text-gray-600 mb-1">Local Store</div>
            <h1 className="text-2xl font-bold text-text mb-4">{coupon.title.rendered}</h1>
            
            <div className="bg-offer/20 text-text p-3 rounded-lg font-bold text-xl mb-4">
              10% OFF
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar size={16} className="mr-1" />
              <span>Valid until: 31 Dec 2025</span> {/* Static until real expiry field added */}
            </div>
            
            <div className="flex items-start mb-4">
              <TagIcon size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Food</span> {/* Static until real category added */}
            </div>

            <div className="flex items-start mb-6">
              <MapPin size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
              <p className="text-gray-700">Milan Chowk, Butwal</p> {/* Static until real location field added */}
            </div>

            <button 
              onClick={handleCopyCode}
              className="mt-6 w-full button-action flex items-center justify-center py-3"
            >
              <Copy size={20} className="mr-2" />
              Copy Offer Code
            </button>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Description:</h3>
          <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: coupon.excerpt.rendered }} />

          {/* No Terms & Conditions yet, can add later if available */}
        </div>
      </div>

      {relatedCoupons.length > 0 && (
        <div className="mt-12">
          <h2 className="section-heading text-2xl font-bold text-text mb-6">Similar Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCoupons.map((related) => (
              <CouponCard 
                key={related.id}
                id={related.id.toString()}
                title={related.title.rendered}
                description={related.excerpt.rendered}
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