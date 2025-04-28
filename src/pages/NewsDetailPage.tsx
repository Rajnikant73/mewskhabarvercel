import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface NewsPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="text-gray-500 text-sm mb-4">{new Date(post.date).toLocaleDateString('ne-NP')}</p>
      <div className="prose prose-lg max-w-full" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}