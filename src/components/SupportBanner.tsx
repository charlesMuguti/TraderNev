
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useSupportBanner } from '@/hooks/useSupportBanner';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface SupportBannerData {
  broker_name: string;
  affiliate_link: string;
  crypto_wallet: string;
  message: string;
}

const SupportBanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<SupportBannerData | null>(null);
  const { isVisible, dismissBanner } = useSupportBanner();

  useEffect(() => {
    const fetchBannerData = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'support_banner')
        .single();

      if (error) {
        console.error('Error fetching banner data:', error);
        return;
      }

      if (data?.value) {
        setBannerData(data.value as SupportBannerData);
      }
    };

    fetchBannerData();
  }, []);

  const handleCopyWallet = () => {
    if (bannerData?.crypto_wallet) {
      navigator.clipboard.writeText(bannerData.crypto_wallet);
      toast.success('Wallet address copied!');
    }
  };

  if (!isVisible || !bannerData) return null;

  const formattedMessage = bannerData.message.replace('[broker_name]', bannerData.broker_name);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full glass-card dark:glass-card-dark p-3 flex items-center justify-between">
      <div className="flex items-center space-x-4 w-full">
        <p className="text-sm flex-grow text-gray-800 dark:text-gray-200">
          {formattedMessage}
        </p>
        <div className="flex items-center space-x-2">
          <a 
            href={bannerData.affiliate_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary mr-2"
          >
            Register with {bannerData.broker_name}
          </a>
          <button 
            onClick={handleCopyWallet} 
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Copy Crypto Wallet
          </button>
          <button 
            onClick={dismissBanner} 
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Dismiss banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportBanner;
