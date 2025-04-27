import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, image, date, category }) => {
  return (
    <Link to={`/news/${id}`} className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{excerpt}</p>
        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          <time>{date}</time>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;