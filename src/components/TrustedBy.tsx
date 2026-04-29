import React from 'react';

const partners = [
  'PayPal', 'Yahoo', 'Lenovo', 'Canon', 'Zoom', 'Google'
];

export default function TrustedBy() {
  return (
    <section className="py-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <div key={partner} className="text-3xl font-black text-slate-400 hover:text-primary transition-all cursor-default font-display tracking-tighter hover:scale-110">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
