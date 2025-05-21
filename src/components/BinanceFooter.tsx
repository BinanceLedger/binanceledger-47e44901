
import { FC } from "react";

const BinanceFooter: FC = () => {
  return (
    <footer className="bg-binance-black py-8 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.binance.com/en/exchange/professional" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Exchange
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/buycrypto" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Buy Crypto
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/spot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Trading
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/nft/home" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  NFT
                </a>
              </li>
              <li>
                <a href="https://www.binance.com/en/feed" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-binance-yellow">
                  Feed
                </a>
              </li>
            </ul>
          </div>
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
            </ul>
          </div>
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
                  Customer Support
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
            </ul>
          </div>
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
                  Learn Crypto
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
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
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
          </div>
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Binance Ledger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BinanceFooter;
