import React from 'react';
import HeroSlider from '../components/HeroSlider';
import NewsCard from '../components/NewsCard';
import RentalCard from '../components/RentalCard';
import CouponCard from '../components/CouponCard';
import SectionHeading from '../components/SectionHeading';
import { dummyNewsData } from '../data/newsData';
import { dummyRentalData } from '../data/rentalData';
import { dummyCouponData } from '../data/couponData';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSlider />
      
      <div className="container mx-auto px-4 py-8">
        {/* News Section */}
        <section className="mb-12">
          <SectionHeading title="Aaja Ko Taja Khabar" link="/news" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {dummyNewsData.slice(0, 5).map((news) => (
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
        </section>
        
        {/* Rentals Section */}
        <section className="mb-12">
          <SectionHeading title="Room/Flat Khojna Sajilo!" link="/rentals" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyRentalData.slice(0, 4).map((rental) => (
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
        </section>
        
        {/* Coupons Section */}
        <section className="mb-12">
          <SectionHeading title="Aaja Ko Special Offer" link="/coupons" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyCouponData.slice(0, 4).map((coupon) => (
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