// src/hooks/usePrebid.js
import { useEffect } from 'react';
import { initPrebid } from '../services/prebidService';

// Custom Hook for Prebid Initialization

const usePrebid = () => {
  useEffect(() => {
    initPrebid();
  }, []);
};

export default usePrebid;
