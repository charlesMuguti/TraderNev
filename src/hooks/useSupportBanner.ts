// This hook is no longer used since the SupportBanner is now permanently displayed
// Keeping the file as a placeholder in case we need to reimplement dismissible behavior

import { useState } from 'react';

export const useSupportBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const dismissBanner = () => {
    setIsVisible(false);
  };

  return { isVisible, dismissBanner };
};
