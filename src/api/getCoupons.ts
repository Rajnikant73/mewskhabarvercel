export async function getCoupons() {
  try {
    const res = await fetch('https://news.mewskhabar.com/wp-json/wp/v2/coupon?_embed');
    if (!res.ok) {
      console.error('API responded with error status:', res.status);
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return []; // important to prevent page crash
  }
}