
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const BinanceHeader: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [latestBuild, setLatestBuild] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`${isScrolled ? 'hidden' : ''} bg-binance-black py-4 border-b border-gray-800 sticky top-0 z-50`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" className="mr-8">
            <div className="flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
                alt="Binance Logo" 
                className="h-6"
                onError={(e) => {
                  setLogoError(true);
                  e.currentTarget.style.display = 'none';
                }}
              />
              {logoError && (
                <span className="text-binance-yellow font-bold text-xl">
                  BINANCE LEDGER
                </span>
              )}
            </div>
          </a>
          <nav className="hidden md:flex space-x-8">
            <a href="https://www.binance.com/en" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-binance-yellow transition-colors">
              Buy Crypto
            </a>
            <a href="https://www.binance.com/en/markets" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-binance-yellow transition-colors">
              Markets
            </a>
            <a href="https://www.binance.com/en/trade/BTC_USDT" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-binance-yellow transition-colors">
              Trade
            </a>
            <a href="https://www.binance.com/en/nft/home" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-binance-yellow transition-colors">
              NFT
            </a>
            <span className="text-binance-yellow">Privacy Portal</span>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-binance-yellow text-binance-yellow hover:bg-binance-yellow/10">
                <Download className="mr-2 h-4 w-4" />
                Download App
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => {
                  // Create a function to fetch the latest build and trigger download
                  const downloadLatestBuild = () => {
                    // In a real app, we would dynamically determine the latest build
                    // For demo purposes, we'll use a hardcoded path
                    const link = document.createElement('a');
                    link.href = '/downloads/latest-build.zip'; // This path would be served by your backend
                    link.download = 'binance-ledger-latest.zip';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  };
                  downloadLatestBuild();
                }}
              >
                Download Latest Build
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  window.open('https://github.com/binance/ledger-app', '_blank');
                }}
              >
                Source Code (GitHub)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a
            href="https://accounts.binance.com/en/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-binance-black bg-binance-yellow rounded-md font-medium hover:bg-opacity-90 transition"
          >
            Login
          </a>
          <a
            href="https://accounts.binance.com/en/register"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-binance-yellow text-binance-yellow rounded-md font-medium hover:bg-binance-yellow hover:bg-opacity-10 transition"
          >
            Register
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-binance-dark fixed inset-0 z-50 pt-20">
          <div className="px-4 py-4 space-y-4">
            <a 
              href="https://www.binance.com/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-binance-yellow py-2"
            >
              Buy Crypto
            </a>
            <a 
              href="https://www.binance.com/en/markets" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-binance-yellow py-2"
            >
              Markets
            </a>
            <a 
              href="https://www.binance.com/en/trade/BTC_USDT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-binance-yellow py-2"
            >
              Trade
            </a>
            <a 
              href="https://www.binance.com/en/nft/home" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-gray-300 hover:text-binance-yellow py-2"
            >
              NFT
            </a>
            <span className="block text-binance-yellow py-2">Privacy Portal</span>
            
            {/* Add download option to mobile menu */}
            <div className="block py-2">
              <button 
                className="flex items-center text-binance-yellow hover:text-binance-yellow/80"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/downloads/latest-build.zip';
                  link.download = 'binance-ledger-latest.zip';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download App
              </button>
            </div>
            
            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="https://accounts.binance.com/en/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 text-center text-binance-black bg-binance-yellow rounded-md font-medium"
              >
                Login
              </a>
              <a
                href="https://accounts.binance.com/en/register"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 text-center border border-binance-yellow text-binance-yellow rounded-md font-medium"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default BinanceHeader;
