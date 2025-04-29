import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  image: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const HeroSlider: React.FC = () => {
  // 1) grab data
  const { data: posts, error } = useSWR<any[]>(
    'https://news.mewskhabar.com/wp-json/wp/v2/slider?_embed',
    fetcher,
    { refreshInterval: 600000 } // revalidate every 10m
  );

  // 2) derive slides once posts arrive
  const slides: Slide[] = React.useMemo(() => {
    if (!posts) return [];
    return posts.map(p => ({
      id: p.id,
      title: p.title.rendered,
      image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/fallback.jpg',
    }));
  }, [posts]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(i => (i === 0 ? slides.length - 1 : i - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(i => (i === slides.length - 1 ? 0 : i + 1));
  }, [slides.length]);

  // 3) autoplay
  useEffect(() => {
    if (!slides.length) return;
    const iv = setInterval(goToNext, 5000);
    return () => clearInterval(iv);
  }, [goToNext, slides.length]);

  // 4) loading & error
  if (error) return <div className="h-64 flex items-center justify-center">Failed to load slides</div>;
  if (!posts) return <div className="h-64 flex items-center justify-center">Loading slides…</div>;

  // 5) render
  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-700"
        style={{ backgroundImage: `url(${slides[currentIndex].image})`, opacity: 0.98 }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-white text-xl md:text-3xl font-bold max-w-3xl mx-auto">
              {slides[currentIndex].title}
            </h2>
            <button className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition">
              Thapne Janakari
            </button>
          </div>
        </div>
      </div>

      {/* arrows */}
      <button
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/50 text-white rounded-full z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/50 text-white rounded-full z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === idx ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;