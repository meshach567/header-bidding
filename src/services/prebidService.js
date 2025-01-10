// src/services/prebidService.js
import pbjs from 'prebid.js';
import { trackBidMetrics, trackEvent } from './analyticsService';
import 'prebid.js/modules/rubiconBidAdapter'; // imported modules will register themselves automatically with prebid
import 'prebid.js/modules/appnexusBidAdapter';

const FALLBACK_ADS = {
  'banner-ad-desktop': '<div>Fallback Ad for Desktop</div>',
  'banner-ad-mobile': '<div>Fallback Ad for Mobile</div>',
}; // Define fallback ads for ad units

const validateBid = (bid) => {
  const errors = [];

  // Validate price
  if (bid.cpm <= 0) {
    errors.push('Invalid CPM value');
  }

  // Validate advertiser domain
  if (!bid.adomain || bid.adomain.length === 0) {
    errors.push('Missing advertiser domain');
  }

  // Validate creative compatibility
  if (!bid.creativeId || !bid.ad) {
    errors.push('Invalid creative or missing ad markup');
  }

  if (errors.length > 0) {
    console.error(`Bid Validation Failed for ${bid.bidder}:`, errors);
    return false;
  }

  return true;
};

export const initPrebid = () => {
  window.pbjs = pbjs;
  window.pbjs.que = window.pbjs.que || [];

  const dynamicFloorPrice = (size, deviceType) => {
    if (deviceType === 'desktop') {
      if (size[0] === 728 && size[1] === 90) return 1.50; // 728x90 for desktop
      if (size[0] === 970 && size[1] === 250) return 2.00; // 970x250 for desktop
    } else if (deviceType === 'mobile') {
      if (size[0] === 320 && size[1] === 50) return 0.80; // 320x50 for mobile
      if (size[0] === 300 && size[1] === 250) return 1.20; // 300x250 for mobile
    }
    return 0.50; // Default floor price
  };

  const getDeviceType = () => {
    return window.innerWidth >= 768 ? 'desktop' : 'mobile';
  };

  const deviceType = getDeviceType();

  //  Add Demand Partners (SSPs) and Ad Units

  const adUnits = [
    {
      code: 'banner-ad-desktop',
      mediaTypes: {
        banner: {
          sizes: [[728, 90], [970, 250]], // Desktop sizes
        },
      },
      bids: [
        {
          bidder: 'appnexus', // AppNexus bidder, Configure Adapters
          params: {
            placementId: '12345678', // Replace with AppNexus placement ID
          },
          floorPrice: dynamicFloorPrice([728, 90], deviceType),
        },
        {
          bidder: 'rubicon', // Rubicon bidder, Configure Adapters
          params: {
            accountId: '87654321',
            siteId: '11223344',
            zoneId: '55667788',
          },
          floorPrice: dynamicFloorPrice([728, 90], deviceType),
        },
      ],
    },
    {
      code: 'banner-ad-mobile',
      mediaTypes: {
        banner: {
          sizes: [[320, 50], [300, 250]], // Mobile sizes
        },
      },
      bids: [
        {
          bidder: 'appnexus', // AppNexus bidder, Configure Adapters
          params: {
            placementId: '12345679', // Replace with AppNexus placement ID
          },
          floorPrice: dynamicFloorPrice([320, 50], deviceType),
        },
        {
          bidder: 'rubicon',  // Rubicon bidder, Configure Adapters
          params: {
            accountId: '87654322',
            siteId: '11223345',
            zoneId: '55667789',
          },
          floorPrice: dynamicFloorPrice([320, 50], deviceType),
        },
      ],
    },
  ];

  pbjs.que.push(() => {
    pbjs.addAdUnits(adUnits);
    pbjs.setConfig({
      debug: true,
    }); // Enable debug mode

    pbjs.onEvent('bidTimeout', (data) => {
      data.forEach((timeout) => {
        console.warn(`Bid Timeout: ${timeout.bidder}`);
        trackEvent('Header Bidding', 'Bid Timeout', timeout.bidder, null);
      });
    }); // Log bid timeouts
  
    pbjs.onEvent('bidResponse', (bid) => {
      if (!bid || bid.cpm <= 0) {
        console.error(`Invalid Bid Response: ${bid.bidder}`);
        trackEvent('Header Bidding', 'Invalid Bid Response', bid.bidder, null);
      }
    }); // Log invalid bid responses
  
    
    pbjs.requestBids({
      bidsBackHandler: (bids) => {
        const metrics = [];
        const errors = [];

        Object.keys(bids).forEach((bidId) => {
          const responses = bids[bidId].bids || [];

          responses.forEach((bid) => {
            metrics.push({
              action: 'Bid Received',
              label: bid.bidder,
              value: bid.cpm, // Cost per mille
            });

            if (bid.timeToRespond) {
              metrics.push({
                action: 'Latency',
                label: bid.bidder,
                value: bid.timeToRespond, // Latency in ms
              });
            }

            // Log errors for invalid bids
            if (!bid.cpm || bid.cpm <= 0) {
              errors.push({ bidder: bid.bidder, error: 'Invalid CPM value' });
            }
          });

          // Track metrics
          trackBidMetrics(metrics);

          // Handle win rate tracking (e.g., compare winning bids)
          if (bids[bidId].winner) {
            trackEvent(
              'Header Bidding',
              'Winning Bid',
              bids[bidId].winner,
              bids[bidId].cpm,
            ); // Track winning bid
          }
        }); // Loop through bids

        
        logErrors(errors); // Log errors


        pbjs.requestBids({
          bidsBackHandler: (bids) => {
            const successfulBids = Object.values(bids)
              .flatMap((unit) => unit.bids)
              .filter((bid) => {
                const isValid = validateBid(bid);
                return isValid && bid.cpm > 0;
              }); // Filter successful bids
    
            if (successfulBids.length === 0) {
              // Render fallback ads when no successful bids
              Object.keys(FALLBACK_ADS).forEach((adUnitCode) => {
                document.getElementById(adUnitCode).innerHTML = FALLBACK_ADS[adUnitCode];
              }); // Render fallback ads
            } else {
              pbjs.setTargetingForGPTAsync();
            }
          },
        }); // Request bids again
      },
    });  // Request bids
  }); // Push to Prebid queue
};

const logErrors = (errors) => {
  errors.forEach((error) => {
    console.error(`SSP Error: ${error.bidder} - ${error.error}`);
    trackEvent(
      'Header Bidding',
      'SSP Error',
      error.bidder,
      error.error,
    );
  });
}; // Enhance Prebid.js configuration to track metrics and log errors.
