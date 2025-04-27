import { Feed } from 'feed';
import { dummyNewsData } from '../data/newsData';

export function generateRssFeed() {
  const feed = new Feed({
    title: "Mews Khabar - Hamro Lumbini, Hamro Khabar",
    description: "Aaja Ko Taja Khabar, Room Rentals, Local Discounts ekai thau ma. Aba Khojna Sajilo, Bachau Paisa Mews Khabar sanga!",
    id: "https://mewskhabar.com/",
    link: "https://mewskhabar.com/",
    language: "ne",
    image: "https://mewskhabar.com/mews-logo.svg",
    favicon: "https://mewskhabar.com/mews-logo.svg",
    copyright: "स्वाधिकार © २०८२ म्युज खबर | All rights reserved.",
    updated: new Date(),
    generator: "Mews Khabar RSS Feed",
    feedLinks: {
      rss2: "https://mewskhabar.com/rss.xml",
    },
  });

  dummyNewsData.forEach(news => {
    feed.addItem({
      title: news.title,
      id: `https://mewskhabar.com/news/${news.id}`,
      link: `https://mewskhabar.com/news/${news.id}`,
      description: news.excerpt,
      content: news.content.join('\n\n'),
      author: [
        {
          name: news.author,
        },
      ],
      date: new Date(news.date),
      image: news.image,
    });
  });

  return feed;
}