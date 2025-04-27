import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Khoji Rahal Bani Sasta Room? Aba Milayi Aapan Ghar Online!",
    image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Bachau Paisa — Lumbini ke Top Discounts Aba Mews Khabar ma!",
    image: "https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    title: "Taja Taja Khabar, Aba Mobile Ma — Butwal, Bhairahawa se Live!",
    image: "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="relative h-[400px] md:h-[500px] w-full">
      <div
        className="h-full w-full bg-center bg-cover duration-500 transition-all relative"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-white text-xl md:text-3xl font-bold max-w-4xl mx-auto">
              {slides[currentIndex].title}
            </h2>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-blue-600 transition-colors">
              Thapne Janakari
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer">
        <button 
          onClick={goToPrevious}
          className="p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;