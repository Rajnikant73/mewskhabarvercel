import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  link?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, link }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="section-heading text-2xl font-bold text-text">{title}</h2>
      {link && (
        <Link
          to={link}
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
        >
          <span>Sab Herne</span>
          <ChevronRight size={16} className="ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;