import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyNewsData } from '../data/newsData';
import { Calendar, User, Tag as TagIcon, ArrowLeft } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import NotFoundPage from './NotFoundPage';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState(dummyNewsData.find(news => news.id === id));
  const [relatedNews, setRelatedNews] = useState<typeof dummyNewsData>([]);
  
  useEffect(() => {
    if (news) {
      // Get 3 related news from the same category
      const related = dummyNewsData
        .filter(item => item.id !== id && item.category === news.category)
        .slice(0, 3);
      setRelatedNews(related);
    }
  }, [id, news]);
  
  if (!news) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/news" className="flex items-center text-primary hover:text-primary/80 font-medium">
          <ArrowLeft size={16} className="mr-1" />
          <span>Sab Khabar Ma Janus</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-[300px] md:h-[400px] relative">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              {news.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-text mb-4">{news.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <time>{news.date}</time>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center">
              <TagIcon size={16} className="mr-1" />
              <span>{news.category}</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <div className="font-medium italic mb-6">
              {news.excerpt}
            </div>
            
            <div className="space-y-4 text-gray-700 font-devanagari">
              {/* Note: In a real application, this would be actual Devanagari content */}
              {news.content && news.content.map((paragraph, index) => (
                <p key={index} style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {relatedNews.length > 0 && (
        <div className="mt-12">
          <h2 className="section-heading text-2xl font-bold text-text mb-6">Yesai Sambandhi Khabar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedNews.map((related) => (
              <NewsCard 
                key={related.id}
                id={related.id}
                title={related.title}
                excerpt={related.excerpt}
                image={related.image}
                date={related.date}
                category={related.category}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetailPage;