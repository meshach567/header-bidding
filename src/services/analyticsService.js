// src/services/analyticsService.js
import ReactGA from 'react-ga4';

// Initialize Google Analytics and Create a service for tracking Prebid metrics.
export const initAnalytics = () => {
  ReactGA.initialize(process.env.MEASUREMENT_ID); // Replace with your GA4 Measurement ID
};

export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  }); // Track event
};

export const trackBidMetrics = (metrics) => {
  metrics.forEach((metric) => {
    trackEvent('Header Bidding', metric.action, metric.label, metric.value); // Track bid metrics
  });
};
