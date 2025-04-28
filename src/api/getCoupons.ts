export async function getCoupons() {
    try {
      const response = await fetch('https://news.mewskhabar.com/wp-json/wp/v2/coupon?_embed');
      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return [];
    }
  }