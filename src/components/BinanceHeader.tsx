
import { FC } from "react";
import { Link } from "react-router-dom";

const BinanceHeader: FC = () => {
  return (
    <header className="bg-binance-black py-4 border-b border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <img 
              src="https://public.bnbstatic.com/image/cms/blog/20200707/631c823b-886e-4e46-b21d-a3bf21aea8bf.png" 
              alt="Binance Logo" 
              className="h-8"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-binance-yellow transition-colors">
              Home
            </Link>
            <Link to="/" className="text-gray-300 hover:text-binance-yellow transition-colors">
              About
            </Link>
            <span className="text-binance-yellow">Privacy Portal</span>
            <Link to="/" className="text-gray-300 hover:text-binance-yellow transition-colors">
              Support
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-binance-black bg-binance-yellow rounded-md font-medium hover:bg-opacity-90 transition"
          >
            Login
          </Link>
          <Link
            to="/"
            className="px-4 py-2 border border-binance-yellow text-binance-yellow rounded-md font-medium hover:bg-binance-yellow hover:bg-opacity-10 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BinanceHeader;
