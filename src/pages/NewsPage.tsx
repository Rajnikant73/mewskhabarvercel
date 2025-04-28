import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // <<== IMPORTANT ADDITION
import { getNews } from '../api/getNews';

interface NewsItem {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading news...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Aaja Ko Taja Khabar</h1>
      <div className="space-y-8">
        {news.map((item) => (
          <div key={item.id} className="border-b pb-4">
            <h2
              className="text-2xl font-semibold"
              dangerouslySetInnerHTML={{ __html: item.title.rendered }}
            />
            <p className="text-gray-500 text-sm">
              {new Date(item.date).toLocaleDateString('en-NP')}
            </p>
            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
            />
            <Link
              to={`/news/${item.id}`} // <<== Corrected internal routing
              className="text-blue-600 font-medium mt-2 inline-block"
            >
              पूरा समाचार पढ्नुहोस् →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}