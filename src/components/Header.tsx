import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Newspaper, Home, Search, Tag, Phone, Menu, X, Rss } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Mews Khabar</h1>
              <p className="text-xs text-text">Hamro Lumbini, Hamro Khabar</p>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text hover:text-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`nav-link flex items-center space-x-1 text-sm ${
                location.pathname === '/' ? 'text-primary font-medium' : 'text-text'
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link
              to="/news"
              className={`nav-link flex items-center space-x-1 text-sm ${
                location.pathname.includes('/news') ? 'text-primary font-medium' : 'text-text'
              }`}
            >
              <Newspaper size={16} />
              <span>News</span>
            </Link>
            <Link
              to="/rentals"
              className={`nav-link flex items-center space-x-1 text-sm ${
                location.pathname.includes('/rentals') ? 'text-primary font-medium' : 'text-text'
              }`}
            >
              <Home size={16} />
              <span>Rentals</span>
            </Link>
            <Link
              to="/coupons"
              className={`nav-link flex items-center space-x-1 text-sm ${
                location.pathname.includes('/coupons') ? 'text-primary font-medium' : 'text-text'
              }`}
            >
              <Tag size={16} />
              <span>Coupons</span>
            </Link>
            <a
              href="tel:078-5555555"
              className="nav-link flex items-center space-x-1 text-sm text-text"
            >
              <Phone size={16} />
              <span>Contact</span>
            </a>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center space-x-1 text-sm text-text"
              title="RSS Feed"
            >
              <Rss size={16} />
              <span className="sr-only">RSS Feed</span>
            </a>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Khoji Rahal Bani News, Room, ya Discount?"
                className="px-4 py-1 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary text-sm w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white p-1 rounded-r-lg hover:bg-blue-600"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation & Search */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="px-4 mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Khoji Rahal Bani News, Room, ya Discount?"
                  className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary text-sm flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-r-lg hover:bg-blue-600"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
            <nav className="flex flex-col space-y-3 px-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  location.pathname === '/' ? 'bg-primary/10 text-primary' : 'text-text'
                }`}
                onClick={toggleMenu}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link
                to="/news"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  location.pathname.includes('/news') ? 'bg-primary/10 text-primary' : 'text-text'
                }`}
                onClick={toggleMenu}
              >
                <Newspaper size={20} />
                <span>News</span>
              </Link>
              <Link
                to="/rentals"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  location.pathname.includes('/rentals') ? 'bg-primary/10 text-primary' : 'text-text'
                }`}
                onClick={toggleMenu}
              >
                <Home size={20} />
                <span>Rentals</span>
              </Link>
              <Link
                to="/coupons"
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  location.pathname.includes('/coupons') ? 'bg-primary/10 text-primary' : 'text-text'
                }`}
                onClick={toggleMenu}
              >
                <Tag size={20} />
                <span>Coupons</span>
              </Link>
              <a
                href="tel:078-5555555"
                className="flex items-center space-x-2 p-2 rounded-lg text-text"
                onClick={toggleMenu}
              >
                <Phone size={20} />
                <span>Contact</span>
              </a>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg text-text"
                onClick={toggleMenu}
              >
                <Rss size={20} />
                <span>RSS Feed</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;