export async function getRentals() {
    try {
      const res = await fetch('https://news.mewskhabar.com/wp-json/wp/v2/rental?_embed', {
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch rentals');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching rentals:', error);
      throw error;
    }
  }