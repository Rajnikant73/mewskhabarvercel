export async function getNews() {
    try {
      const res = await fetch('https://cornflowerblue-moose-538317.hostingersite.com/wp-json/wp/v2/posts', {
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch news');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }