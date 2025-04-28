import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface NewsPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`https://cornflowerblue-moose-538317.hostingersite.com/wp-json/wp/v2/posts/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading full news...</div>;
  }

  if (!post) {
    return <div className="text-center mt-10 text-red-600 font-semibold">समाचार भेटिएन!</div>;
  }

  const shareUrl = `https://www.mewskhabar.com/news/${id}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Title */}
      <h1
        className="text-4xl font-bold mb-4 text-gray-800 leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Date */}
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.date).toLocaleDateString('ne-NP')}
      </p>

      {/* Content */}
      <div
        className="prose prose-lg text-gray-700 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-4 mt-10">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Share on Facebook
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Share on WhatsApp
        </a>
      </div>

      {/* Back Button */}
      <div className="mt-12">
        <button
          onClick={() => navigate('/news')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded"
        >
          ← पछाडी जानुहोस् (Back to News)
        </button>
      </div>
    </div>
  );
}