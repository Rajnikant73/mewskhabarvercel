import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-8 pb-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">सम्पादकीय टोली</h3>
            <div className="text-sm">
              <p>संचालक: रवि चौधरी</p>
              <p>प्रधान सम्पादक: सन्तोष चौधरी</p>
              <p>सिस्टम अपरेटर: रामकेश गुप्ता</p>
              <p>समाचार सहयोगी: साधना कुमारी थारु चौधरी</p>
              <p>कार्यालय व्यवस्थापक: जनकनन्दनी चौधरी</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">सम्पर्क</h3>
            <div className="text-sm">
              <p>मायादेवी गाउँपालिका ०३, गुण्डा चोक, रुपन्देही, नेपाल</p>
              <p>फोन: ०७८-५५५५५५५</p>
              <p>ईमेल: news@mewskhabar.com</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-blue-200" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">कानुनी</h3>
            <div className="text-sm">
              <p>प्रेस काउन्सिल दर्ता नं: ####/####</p>
              <p>सूचना विभाग दर्ता नं: ####/####</p>
              <p>स्वाधिकार © २०८२ म्युज खबर | All rights reserved.</p>
              <p>Developed by Mews Media Pvt. Ltd.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-blue-400 text-center text-sm">
          <p>Mews Khabar - Hamro Lumbini, Hamro Khabar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;