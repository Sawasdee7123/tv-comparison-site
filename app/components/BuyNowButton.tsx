'use client';

import { TV } from '@/lib/types';

interface BuyNowButtonProps {
  tv: TV;
  variant?: 'small' | 'large';
}

export default function BuyNowButton({ tv, variant = 'small' }: BuyNowButtonProps) {
  // Get the first available affiliate link
  const getAffiliateLink = (): { url: string; retailer: string } | null => {
    if (tv.affiliate_amazon) return { url: tv.affiliate_amazon, retailer: 'Amazon' };
    if (tv.affiliate_bestbuy) return { url: tv.affiliate_bestbuy, retailer: 'Best Buy' };
    if (tv.affiliate_walmart) return { url: tv.affiliate_walmart, retailer: 'Walmart' };
    if (tv.affiliate_target) return { url: tv.affiliate_target, retailer: 'Target' };
    return null;
  };

  const affiliate = getAffiliateLink();

  if (!affiliate) {
    // No affiliate link available - show placeholder
    if (variant === 'small') {
      return (
        <button 
          disabled
          className="px-4 py-2 bg-gray-700 text-gray-400 text-sm font-semibold rounded-lg cursor-not-allowed"
          title="Coming soon"
        >
          Buy Now
        </button>
      );
    }
    return (
      <button 
        disabled
        className="w-full px-6 py-3 bg-gray-700 text-gray-400 font-semibold rounded-xl cursor-not-allowed"
      >
        Coming Soon
      </button>
    );
  }

  if (variant === 'small') {
    return (
      <a
        href={affiliate.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Buy Now
      </a>
    );
  }

  return (
    <div className="space-y-3">
      <a
        href={affiliate.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-center rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
      >
        <div className="text-lg">Buy Now</div>
        <div className="text-sm opacity-90">via {affiliate.retailer}</div>
      </a>
      
      {/* Show additional retailer options if available */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tv.affiliate_amazon && affiliate.retailer !== 'Amazon' && (
          <a
            href={tv.affiliate_amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors border border-gray-700"
          >
            Amazon
          </a>
        )}
        {tv.affiliate_bestbuy && affiliate.retailer !== 'Best Buy' && (
          <a
            href={tv.affiliate_bestbuy}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors border border-gray-700"
          >
            Best Buy
          </a>
        )}
        {tv.affiliate_walmart && affiliate.retailer !== 'Walmart' && (
          <a
            href={tv.affiliate_walmart}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors border border-gray-700"
          >
            Walmart
          </a>
        )}
        {tv.affiliate_target && affiliate.retailer !== 'Target' && (
          <a
            href={tv.affiliate_target}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors border border-gray-700"
          >
            Target
          </a>
        )}
      </div>
    </div>
  );
}
