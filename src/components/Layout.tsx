import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import BreakingNews from './BreakingNews';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;