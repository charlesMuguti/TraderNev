
import { useState, useEffect } from 'react';

export const useSupportBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissedBanner = sessionStorage.getItem('supportBannerDismissed');
    if (dismissedBanner === 'true') {
      setIsVisible(false);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    sessionStorage.setItem('supportBannerDismissed', 'true');
  };

  return { isVisible, dismissBanner };
};
