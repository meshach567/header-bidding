// src/pages/Home.jsx
import React from 'react';
import AdSlot from '../components/AdSlot';
import usePrebid from '../hooks/usePrebid';

const Home = () => {
  usePrebid();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Header Bidding</h1>
      <div className="hidden md:block">
        {/* Desktop Ad Slot Integrate the ad slots in your home page and utilize the usePrebid hook.*/}
        
        <AdSlot id="banner-ad-desktop" className="w-[728px] h-[90px]" />
      </div>
      <div className="block md:hidden">
        {/* Mobile Ad Slot Integrate the ad slots in your home page and utilize the usePrebid hook.*/}
        <AdSlot id="banner-ad-mobile" className="w-[320px] h-[50px]" />
      </div>
    </div>
  );
};

export default Home;
