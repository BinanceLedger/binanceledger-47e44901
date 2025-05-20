
import { FC } from "react";
import { Link } from "react-router-dom";

const BinanceFooter: FC = () => {
  return (
    <footer className="bg-binance-black py-8 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-binance-yellow font-bold text-lg mb-4">Binance Ledger</h3>
            <p className="text-gray-400 mb-4">
              The world's leading cryptocurrency platform
            </p>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.02 10.02 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                <span className="sr-only">Telegram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.132c-.175.785-.841 3.747-1.188 5.304-.147.63-.295 1.153-.422 1.553-.126.4-.232.573-.317.648-.085.075-.15.086-.195.075l-.102-.055-.737-.477c-.442-.283-.95-.645-1.562-1.09-.736-.53-1.1-.935-1.125-1.214-.011-.117.035-.234.137-.352.102-.117.275-.258.52-.422.245-.164.531-.345.857-.543.326-.198.693-.412 1.1-.648 1.076-.622 1.787-1.149 2.137-1.579.175-.215.215-.339.122-.37-.094-.032-.327.095-.7.382-.465.356-1.057.761-1.774 1.214-.935.591-1.895.926-2.88 1.006-.47.04-.908-.055-1.313-.285-.183-.102-.44-.252-.771-.451-.332-.198-.56-.336-.685-.412-.47-.286-.883-.615-1.237-.985a5.567 5.567 0 01-.985-1.371c-.169-.314-.3-.689-.394-1.124.527-.254 1.129-.411 1.806-.471C8.627 7.156 9.346 7.112 10 7c.982-.17 1.862-.142 2.637.085.776.228 1.492.544 2.148.95.656.404 1.203.838 1.64 1.3.162.184.287.356.376.515.89.16.134.248.136.266.002.018-.125.008-.375.016z" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Ledger Wallet
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Exchange
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Academy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Charity
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Desktop Application
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Buy Crypto
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-binance-yellow">
                  Institutional Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Binance Ledger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BinanceFooter;
