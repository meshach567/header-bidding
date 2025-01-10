// src/components/AdSlot.jsx
import React, { useEffect, useRef, useState } from 'react';
import { initPrebid } from '../services/prebidService';

const AdSlot = ({ id }) => {
  const adRef = useRef(null); // Reference to the ad slot
  const [isInView, setIsInView] = useState(false); // State to check if the ad slot is in view

  useEffect(() => {
    // Use the Intersection Observer API to detect when an ad slot is in the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    ); // Set the threshold to 0.5

    if (adRef.current) {
      observer.observe(adRef.current); // Observe the ad slot
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current); //  Stop observing the ad slot
      }
    };
  }, []); // Run only once

  useEffect(() => {
    if (isInView) {
      initPrebid(); // Initialize Prebid.js and load ads when in view
    }
  }, [isInView]); // Run when isInView changes

  // Render Ad Slot
  return <div id={id} ref={adRef} className="ad-slot bg-gray-200 h-60 w-full"></div>;
};

export default AdSlot;
