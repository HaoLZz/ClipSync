import React from 'react';
import Header from '../UI/Header';
import Footer from '../UI/Footer';
import Hero from './Hero';
import Features from './Features';
import ContactForm from './ContactForm';

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <ContactForm />
      <Footer
        sx={{
          miHeight: '10vh',
          padding: '20px',
          backgroundColor: '#f2f0f1',
        }}
      />
    </>
  );
}
