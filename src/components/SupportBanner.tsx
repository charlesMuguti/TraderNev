
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SupportBannerData {
  broker_name: string;
  affiliate_link: string;
  crypto_wallet: string;
  message: string;
}

const SupportBanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<SupportBannerData | null>(null);

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
        // Properly cast the data to SupportBannerData type
        const bannerValue = data.value as Record<string, any>;
        const typedBannerData: SupportBannerData = {
          broker_name: bannerValue.broker_name || '',
          affiliate_link: bannerValue.affiliate_link || '',
          crypto_wallet: bannerValue.crypto_wallet || '',
          message: bannerValue.message || ''
        };
        setBannerData(typedBannerData);
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

  if (!bannerData) return null;

  const formattedMessage = bannerData.message.replace('[broker_name]', bannerData.broker_name);

  return (
    <div className="w-full glass-card dark:glass-card-dark p-6 rounded-xl my-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Support Us</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {formattedMessage}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <Button 
            variant="default"
            asChild
            className="whitespace-nowrap"
          >
            <a 
              href={bannerData.affiliate_link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Register with {bannerData.broker_name}
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={handleCopyWallet}
            className="whitespace-nowrap bg-opacity-80 backdrop-blur-sm"
          >
            Donate Crypto
          </Button>
        </div>
      </div>
      <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
        <code className="text-xs text-gray-700 dark:text-gray-300 font-mono">
          {bannerData.crypto_wallet}
        </code>
      </div>
    </div>
  );
};

export default SupportBanner;
