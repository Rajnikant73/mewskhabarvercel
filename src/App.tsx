import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import RentalsPage from './pages/RentalsPage';
import CouponsPage from './pages/CouponsPage';
import SearchPage from './pages/SearchPage';
import SingleNewsPage from './pages/news/[id]';  // NEW dynamic single news page
import RentalDetailPage from './pages/RentalDetailPage';
import CouponDetailPage from './pages/CouponDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<SingleNewsPage />} /> {/* 🆕 Single News Page Routing */}
          <Route path="/rentals" element={<RentalsPage />} />
          <Route path="/rentals/:id" element={<RentalDetailPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/coupons/:id" element={<CouponDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;