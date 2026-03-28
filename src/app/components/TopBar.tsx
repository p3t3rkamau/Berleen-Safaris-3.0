import { Phone, Mail, Facebook, Instagram } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-[var(--safari-black)] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
        <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
          <a href="tel:+254714018914" className="flex items-center gap-2 hover:text-[var(--safari-gold)] transition-colors">
            <Phone className="w-4 h-4" />
            <span>Currency: USD</span>
          </a>
          <a href="mailto:tours@berleensafaris.com" className="flex items-center gap-2 hover:text-[var(--safari-gold)] transition-colors">
            <Mail className="w-4 h-4" />
            <span>tours@berleensafaris.com</span>
          </a>
        </div>
        <div className="flex gap-4 items-center">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--safari-gold)] transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--safari-gold)] transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--safari-gold)] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
