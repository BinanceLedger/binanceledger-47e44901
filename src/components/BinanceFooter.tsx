import { FC, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
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

const BinanceFooter: FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const languages = [
    "English", "Deutsch", "Español", "Français", "Italiano", 
    "Português", "Русский", "Türkçe", "日本語", "한국어", "简体中文"
  ];
  
  return (
    <footer className="bg-binance-black py-8 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-binance-yellow font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.binance.com/en/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  About
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/careers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Careers
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/blog" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/community" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Community
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/terms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Terms
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Privacy
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/risk-warning" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Risk Warning
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/announcements" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Announcements
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/news" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  News
                </a>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-white font-medium mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.binance.com/en/exchange" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Exchange
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/buycrypto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Buy Crypto
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/futures" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Futures
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/spot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Spot
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/margin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Margin
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/nft/home" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  NFT
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/earn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Earn
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/feed" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Feed
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.binance.com/en/download" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Downloads
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/binance-api" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/fee/schedule" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Fees
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/vip-institutional-services" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Institutional Services
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/otc-trading" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  OTC Trading
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/referral" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Referral Program
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/affiliate" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/broker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Broker Program
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.binance.com/en/support" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/chat" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Chat Support
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/submit-issue" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Submit a Ticket
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/faq" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/claim/form" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Binance Verification
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/support/law-enforcement" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Law Enforcement Requests
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/landing/data" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Trading Rules
                </a>
              </li>
            </ul>
          </div>
          
          {/* Learn */}
          <div>
            <h3 className="text-white font-medium mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://academy.binance.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Binance Academy
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/learn/categories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Learn & Earn
                </a>
              </li>
              <li>
                <a href="https://research.binance.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Binance Research
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/market-insights" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Market Updates
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/research/projects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Research Reports
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/crypto-glossary" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Crypto Glossary
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/price-indexes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Bitcoin Prices
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Community Icons */}
          <div className="flex flex-wrap gap-4">
            <a href="https://twitter.com/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.02 10.02 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://t.me/binanceexchange" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">Telegram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.132c-.175.785-.841 3.747-1.188 5.304-.147.63-.295 1.153-.422 1.553-.126.4-.232.573-.317.648-.085.075-.15.086-.195.075l-.102-.055-.737-.477c-.442-.283-.95-.645-1.562-1.09-.736-.53-1.1-.935-1.125-1.214-.011-.117.035-.234.137-.352.102-.117.275-.258.52-.422.245-.164.531-.345.857-.543.326-.198.693-.412 1.1-.648 1.076-.622 1.787-1.149 2.137-1.579.175-.215.215-.339.122-.37-.094-.032-.327.095-.7.382-.465.356-1.057.761-1.774 1.214-.935.591-1.895.926-2.88 1.006-.47.04-.908-.055-1.313-.285-.183-.102-.44-.252-.771-.451-.332-.198-.56-.336-.685-.412-.47-.286-.883-.615-1.237-.985a5.567 5.567 0 01-.985-1.371c-.169-.314-.3-.689-.394-1.124.527-.254 1.129-.411 1.806-.471C8.627 7.156 9.346 7.112 10 7c.982-.17 1.862-.142 2.637.085.776.228 1.492.544 2.148.95.656.404 1.203.838 1.64 1.3.162.184.287.356.376.515.89.16.134.248.136.266.002.018-.125.008-.375.016z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/binance/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://discord.gg/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">Discord</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.979-.608 1.414a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.415.077.077 0 0 0-.079-.036 19.4 19.4 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.648 19.648 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.01 13.01 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.574 19.574 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/binanceyoutube" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://www.reddit.com/r/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">Reddit</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://github.com/binance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
          
          {/* Language Selector and Currency Selector */}
          <div className="flex space-x-4 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
                  <Globe className="h-4 w-4 mr-1" />
                  {selectedLanguage}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 bg-binance-darkGray border-gray-700">
                <div className="grid gap-1 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className={`px-2 py-1.5 text-left hover:bg-gray-800 rounded ${
                        selectedLanguage === lang ? 'text-binance-yellow' : 'text-gray-300'
                      }`}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
                  USD
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 bg-binance-darkGray border-gray-700">
                <div className="grid gap-1 py-1">
                  {['USD', 'EUR', 'GBP', 'AUD', 'JPY'].map((currency) => (
                    <button
                      key={currency}
                      className="px-2 py-1.5 text-left text-gray-300 hover:bg-gray-800 rounded"
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between">
          <div className="text-xs text-gray-500 mb-4 md:mb-0">
            Binance&copy; {new Date().getFullYear()} | <a href="https://www.binance.com/en/terms" className="hover:text-binance-yellow">Terms of Use</a> | <a href="https://www.binance.com/en/privacy" className="hover:text-binance-yellow">Privacy Notice</a> | <a href="https://www.binance.com/en/risk-warning" className="hover:text-binance-yellow">Risk Warning</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BinanceFooter;
