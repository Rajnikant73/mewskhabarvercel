import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
}

export default function SingleNewsPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`https://mewskhabar.com/wp-json/wp/v2/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!post) return <div className="text-center mt-10">Post not found!</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString('en-NP')}</p>
      <div
        className="mt-6 text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}