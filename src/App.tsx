import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import About from './components/About';
import Features from './components/Features';
import FeatureShowcase from './components/FeatureShowcase';
import LiveDemo from './components/LiveDemo';
import HowItWorks from './components/HowItWorks';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CursorFollower from './components/CursorFollower';
import CommandPalette from './components/CommandPalette';
import ImageGenerator from './components/ImageGenerator';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary relative">
      {/* Global AI Pulse Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-neural" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[150px] animate-pulse-neural [animation-delay:1.5s]" />
      </div>

      <CommandPalette />
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Features />
        <FeatureShowcase />
        <LiveDemo />
        <ImageGenerator />
        <HowItWorks />
        <WhyChoose />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
