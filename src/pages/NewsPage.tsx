import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import { dummyNewsData } from '../data/newsData';
import { Search } from 'lucide-react';

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = ['All', 'Local', 'Politics', 'Business', 'Entertainment', 'Sports', 'Technology'];
  
  const filteredNews = dummyNewsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || 
                          news.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text mb-8">Taja Khabar</h1>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Khabar Khojnuhos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category || (category === 'All' && selectedCategory === '')
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNews.map((news) => (
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
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">Khabar Vetiyena</h3>
          <p className="text-gray-500 mt-2">Kripaya arko keyword le khojnuhos.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;