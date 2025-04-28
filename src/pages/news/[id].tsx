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
        const res = await fetch(`https://mewskhabar.com/wp-json/wp/v2/posts/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading post...</p>;
  if (!post) return <p className="text-center mt-10">Post not found!</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <p className="text-gray-500 text-sm mb-4">
        {new Date(post.date).toLocaleDateString('en-NP')}
      </p>
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
}