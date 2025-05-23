// 1) install these first:
//    npm install react-helmet
//    npm install --save-dev @types/react-helmet

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface NewsPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: [
      { source_url: string }
    ];
  };
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        // 2) fetch by slug and include _embed so we get featured media
        const res = await fetch(
          `https://news.mewskhabar.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );
        if (!res.ok) throw new Error('Failed to fetch post');
        const [data] = await res.json();
        setPost(data || null);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-10">Loading full news...</div>;
  }
  if (!post) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        समाचार भेटिएन!
      </div>
    );
  }

  // pick the featured image if available
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://via.placeholder.com/1200x630?text=No+Image';

  const shareUrl = `https://www.mewskhabar.com/news/${slug}`;

  return (
    <>
      {/* 3) Helmet will inject these tags into your <head> */}
      <Helmet>
        <title>{post.title.rendered} | Mews Khabar</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title.rendered} />
        <meta
          property="og:description"
          content={post.content.rendered
            .replace(/<[^>]+>/g, '')
            .slice(0, 150)}
        />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1
          className="text-4xl font-bold mb-4 text-gray-800 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p className="text-sm text-gray-500 mb-8">
          {new Date(post.date).toLocaleDateString('ne-NP')}
        </p>

        {/* show the featured image at top */}
        <img
          src={featuredImage}
          alt=""
          className="w-full h-auto rounded-lg mb-8 object-cover"
        />

        <div
          className="prose prose-lg text-gray-700 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Share on Facebook
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Share on WhatsApp
          </a>
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate('/news')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded"
          >
            ← पछाडी जानुहोस् (Back to News)
          </button>
        </div>
      </div>
    </>
  );
}