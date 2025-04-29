import { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import NewsCard from '../components/NewsCard';
import RentalCard from '../components/RentalCard';
import CouponCard from '../components/CouponCard';
import SectionHeading from '../components/SectionHeading';
import { getCoupons } from '../api/getCoupons';
import { getRentals } from '../api/getRentals';

interface NewsItem {
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

interface RentalItem {
  id: number;
  title: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      { source_url: string }
    ];
  };
}

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

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loadingRentals, setLoadingRentals] = useState(true);

  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('https://news.mewskhabar.com/wp-json/wp/v2/posts?_embed');
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchRentalData() {
      const data = await getRentals();
      setRentals(data);
      setLoadingRentals(false);
    }
    fetchRentalData();
  }, []);

  useEffect(() => {
    async function fetchCouponData() {
      const data = await getCoupons();
      setCoupons(data);
      setLoadingCoupons(false);
    }
    fetchCouponData();
  }, []);

  if (loadingNews || loadingRentals || loadingCoupons) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading content...</p>
      </div>
    );
  }

  return (
    <div>
      <HeroSlider />

      <div className="container mx-auto px-4 py-8">

        {/* News Section */}
        <section className="mb-12">
          <SectionHeading title="Aaja Ko Taja Khabar" link="/news" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {news.slice(0, 5).map((item) => (
              <NewsCard 
                key={item.id}
                id={item.id.toString()}
                title={item.title.rendered}
                excerpt={item.excerpt.rendered}
                image={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                date={item.date}
                category={''}
              />
            ))}
          </div>
        </section>

        {/* Rentals Section */}
        <section className="mb-12">
          <SectionHeading title="Room/Flat Khojna Sajilo!" link="/rentals" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentals.slice(0, 4).map((rental) => (
              <RentalCard 
                key={rental.id}
                id={rental.id.toString()}
                title={rental.title.rendered}
                location={'Bhairahawa'}
                price={22000}
                facilities={[]} 
                image={rental._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                phone={'9818553941'}
              />
            ))}
          </div>
        </section>

        {/* Coupons Section */}
        {/* Coupons Section */}
<section className="mb-12">
  <SectionHeading title="Aaja Ko Special Offer" link="/coupons" />
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {coupons.slice(0, 4).map((coupon) => (
      <CouponCard 
        key={coupon.id}
        id={coupon.id.toString()}
        title={coupon?.title?.rendered || ''}
        description={coupon?.excerpt?.rendered || ''}
        expiryDate={'31 Dec 2025'}
        image={coupon._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/400x300?text=No+Image'}
        discount={'10% OFF'}
        store={'Local Store'}
      />
    ))}
  </div>
</section>

        {/* About Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="section-heading text-2xl font-bold text-text mb-4">Hamro Barey Ma</h2>
          <p className="text-gray-700 leading-relaxed">
            Gaav se sahar sabke liye — Aba sab suvidha ekai thau ma! Mews Khabar le Lumbini, Butwal, ra Bhairahawa ko taja khabar, room rental, ani local business ko discount offer haru sajilo tarika le lyaune prayas gareko cha. Hamro udeshya yaha ko basinda haru lai digital convenience ra local suvidha eutai platform ma provide garne ho.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;