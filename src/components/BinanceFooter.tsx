
import { FC, useState } from "react";
import { ChevronDown, Globe, Plus, DollarSign, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/hooks/use-theme";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection: FC<FooterSectionProps> = ({ title, children }) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  if (isMobile) {
    return (
      <div className="border-b border-gray-800 py-4">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={toggleExpand}
        >
          <h3 className="text-white font-medium">{title}</h3>
          <Plus 
            size={18} 
            className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-45' : ''}`} 
          />
        </div>
        
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-white font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  );
};

const BinanceFooter: FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
  const languages = [
    "English", "Deutsch", "Español", "Français", "Italiano", 
    "Português", "Русский", "Türkçe", "日本語", "한국어", "简体中文"
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <footer className="bg-binance-dark py-8 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className={`${isMobile ? 'space-y-0' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'}`}>
          {/* About Us */}
          <FooterSection title="About Us">
            <li className="list-none">
              <a href="https://www.binance.com/en/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                About
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/about-us/business-contacts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Business Contacts
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/careers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Careers
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support/announcement" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Announcements
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/blog" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                News
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/press" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Press
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/legal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Legal
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/community" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Community
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/blog" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Blog
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/trust" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Building Trust
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/terms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Terms
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Privacy
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/risk-warning" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Risk Warning
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/legal/notices" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Notices
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/cookie-preferences" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Cookie Preferences
              </a>
            </li>
          </FooterSection>
          
          {/* Products */}
          <FooterSection title="Products">
            <li className="list-none">
              <a href="https://www.binance.com/en/trade" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Exchange
              </a>
            </li>
            <li className="list-none">
              <a href="https://academy.binance.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Academy
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/leveraged-tokens" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Leveraged Tokens
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/live" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Live
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.charity" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Charity
              </a>
            </li>
            <li className="list-none">
              <a href="https://labs.binance.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Labs
              </a>
            </li>
            <li className="list-none">
              <a href="https://launchpad.binance.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Launchpad
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/auto-invest" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Auto-Invest
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/eth2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                ETH Staking
              </a>
            </li>
            <li className="list-none">
              <a href="https://research.binance.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Research
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/nft" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                NFT
              </a>
            </li>
            <li className="list-none">
              <a href="https://pay.binance.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Pay
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/gift-card" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Gift Card
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/babt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                BABT
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/tax" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Tax
              </a>
            </li>
          </FooterSection>
          
          {/* Service */}
          <FooterSection title="Service">
            <li className="list-none">
              <a href="https://www.binance.com/en/download" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Downloads
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/desktop-download" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Desktop Application
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/buy-sell-crypto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy Crypto
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/institutional" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Institutional & VIP Services
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/otc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                OTC Trading
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/activity/referral" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Referral
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/activity/affiliate" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Affiliate
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/bnb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                BNB
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/my/coin-listing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Listing Application
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support/faq/how-to-apply-to-become-a-p2p-merchant-on-binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                P2P Merchant Application
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support/faq/how-to-apply-to-become-a-p2pro-merchant-on-binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                P2Pro Merchant Application
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/landing/data" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Historical Market Data
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/proof-of-reserves" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Proof of Reserves
              </a>
            </li>
          </FooterSection>
          
          {/* Support */}
          <FooterSection title="Support">
            <li className="list-none">
              <a href="https://www.binance.com/en/my/user-support/feedback/entry" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Product Feedback & Suggestions
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Support Center
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/chat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                24/7 Chat Support
              </a>
            </li>
            <li className="list-none">
              <a href="https://binance-docs.github.io/apidocs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                APIs
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/fee/schedule" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Fees
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support/faq/trading-rules" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Trading Rules
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/verify" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Binance Verify
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support/law-enforcement" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Law Enforcement Requests
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/support/announcement/airdrop-portal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Binance Airdrop Portal
              </a>
            </li>
          </FooterSection>
          
          {/* Learn */}
          <FooterSection title="Learn">
            <li className="list-none">
              <a href="https://www.binance.com/en/learn-and-earn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Learn & Earn
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/price" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Browse Crypto Prices
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/price/bitcoin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Bitcoin Price
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/price/ethereum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Ethereum Price
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/price-prediction" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Browse Crypto Price Predictions
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/price-prediction/bitcoin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Bitcoin Price Prediction
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/price-prediction/ethereum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Ethereum Price Prediction
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/how-to-buy/bnb" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy BNB
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/how-to-buy/bitcoin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy Bitcoin
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/how-to-buy/ethereum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy Ethereum
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/how-to-buy/dogecoin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy Dogecoin
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/how-to-buy/ripple" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy XRP
              </a>
            </li>
            <li className="list-none">
              <a href="https://www.binance.com/en/altcoins/tradable" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow text-sm">
                Buy Tradable Altcoins
              </a>
            </li>
          </FooterSection>
        </div>
        
        {/* Only add separator on desktop, not mobile to avoid double line */}
        {!isMobile && <Separator className="my-8 bg-gray-800" />}
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Community Section with Label */}
          <div className="flex flex-col">
            <h4 className="text-white text-sm mb-3">Community</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://twitter.com/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.02 10.02 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://t.me/binanceexchange" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Telegram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/binance/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://discord.gg/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Discord</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.979-.608 1.414a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.415.077.077 0 0 0-.079-.036 19.4 19.4 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.648 19.648 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.01 13.01 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.574 19.574 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/binanceyoutube" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.reddit.com/r/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Reddit</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/binance/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">TikTok</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Language and Theme Selectors */}
          <div className={`flex ${isMobile ? 'flex-row items-center justify-between w-full' : 'flex-col md:flex-row items-start md:items-center'} space-y-4 md:space-y-0 md:space-x-4`}>
            {/* Mobile: Compact theme/currency row */}
            {isMobile ? (
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <Toggle 
                  pressed={theme === "dark"} 
                  onPressedChange={toggleTheme}
                  aria-label="Toggle theme"
                  className="text-gray-400 hover:text-binance-yellow data-[state=on]:text-binance-yellow h-8 w-8 p-0"
                >
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </Toggle>

                {/* USD Currency Display */}
                <div className="flex items-center text-gray-400 space-x-1">
                  <DollarSign size={14} />
                  <span className="text-sm">USD</span>
                </div>
              </div>
            ) : (
              <>
                {/* Desktop: Original layout */}
                <Toggle 
                  pressed={theme === "dark"} 
                  onPressedChange={toggleTheme}
                  aria-label="Toggle theme"
                  className="text-gray-400 hover:text-binance-yellow data-[state=on]:text-binance-yellow"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </Toggle>

                <div className="flex items-center text-gray-400 space-x-1">
                  <DollarSign size={16} />
                  <span className="text-sm">USD</span>
                </div>
              </>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`text-gray-400 hover:text-binance-yellow space-x-2 ${isMobile ? 'h-8 px-2' : ''}`}
                >
                  <Globe size={16} />
                  <span className="text-sm">{selectedLanguage}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-binance-dark border-gray-700 max-h-48 overflow-y-auto">
                {languages.map((language) => (
                  <DropdownMenuItem 
                    key={language}
                    onClick={() => setSelectedLanguage(language)}
                    className="text-gray-400 hover:text-binance-yellow hover:bg-gray-800 focus:text-binance-yellow focus:bg-gray-800"
                  >
                    {language}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-800" />
        
        <div className="text-center text-gray-500 text-sm">
          <p>Binance© 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default BinanceFooter;
