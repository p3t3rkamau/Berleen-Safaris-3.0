import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Send } from 'lucide-react';
import { logo }  from '../assets/img/exports';
export function Footer() {
  return (
    <footer className="bg-[var(--safari-brown-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              
               <div className="ml-0">
                <div className="">
                  <img src={logo} alt="Berleen Safaris" className="h-20 w-auto" />
                </div>
            
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted partner for unforgettable East African safari experiences.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--safari-gold)] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/berleen_safaris?igsh=bTZydWlzNGI5NmMw" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--safari-gold)] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--safari-gold)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[var(--safari-gold)]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[var(--safari-gold)] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[var(--safari-gold)] transition-colors">About Us</Link></li>
              <li><Link to="/safaris" className="hover:text-[var(--safari-gold)] transition-colors">Our Safaris</Link></li>
              <li><Link to="/gallery" className="hover:text-[var(--safari-gold)] transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--safari-gold)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[var(--safari-gold)]">Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/destinations/kenya" className="hover:text-[var(--safari-gold)] transition-colors">🇰🇪 Kenya Safaris</Link></li>
              <li><Link to="/destinations/tanzania" className="hover:text-[var(--safari-gold)] transition-colors">🇹🇿 Tanzania Tours</Link></li>
              <li><Link to="/destinations/rwanda" className="hover:text-[var(--safari-gold)] transition-colors">🇷🇼 Rwanda Gorilla Trekking</Link></li>
              <li><Link to="/destinations/uganda" className="hover:text-[var(--safari-gold)] transition-colors">🇺🇬 Uganda Adventures</Link></li>
              <li><Link to="/destinations/south-africa" className="hover:text-[var(--safari-gold)] transition-colors">🇿🇦 South Africa Safaris</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[var(--safari-gold)]">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Wilson Airport,Nairobi, Kenya</span>
              </li>
        
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:tours@berleensafaris.com" className="hover:text-[var(--safari-gold)] transition-colors">tours@berleensafaris.com</a>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-[var(--safari-gold)]"
                />
                <button className="bg-[var(--safari-gold)] p-2 rounded hover:bg-[var(--safari-gold-dark)] transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Berleen Safaris Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
