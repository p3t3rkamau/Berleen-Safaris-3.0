// src/components/FaqSection.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ items, title = 'Frequently Asked Questions' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 bg-gray-50" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-4xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-8 text-[var(--safari-brown-dark)]">
            {title}
          </h2>
        )}
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-[var(--safari-brown-dark)]" itemProp="name">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[var(--safari-gold)] transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div className="text-gray-700 leading-relaxed" itemProp="text">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};