
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const BinanceHeader: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [userCount, setUserCount] = useState(274368184);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Simulate counter increasing every few seconds
    const counterInterval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(counterInterval);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Format the user count with commas
  const formattedUserCount = userCount.toLocaleString();

  return (
    <header className={`${isScrolled ? 'hidden' : ''} bg-binance-dark py-4 border-b border-gray-800 sticky top-0 z-50`}>
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
            <a href="https://www.binance.com/en" target="_blank" rel="noopener noreferrer" className="text-[#848E9C] hover:text-binance-yellow transition-colors">
              Buy Crypto
            </a>
            <a href="https://www.binance.com/en/markets" target="_blank" rel="noopener noreferrer" className="text-[#848E9C] hover:text-binance-yellow transition-colors">
              Markets
            </a>
            <a href="https://www.binance.com/en/trade/BTC_USDT" target="_blank" rel="noopener noreferrer" className="text-[#848E9C] hover:text-binance-yellow transition-colors">
              Trade
            </a>
            <a href="https://www.binance.com/en/nft/home" target="_blank" rel="noopener noreferrer" className="text-[#848E9C] hover:text-binance-yellow transition-colors">
              NFT
            </a>
            <span className="text-binance-yellow">Privacy Portal</span>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center justify-center mr-4">
            <div className="flex items-center">
              <div className="w-1 md:w-2 h-px bg-binance-yellow my-auto mr-2"></div>
              <div className="flex flex-col items-center">
                <span className="text-binance-yellow text-xs font-semibold">
                  {formattedUserCount}
                </span>
                <span className="text-[#848E9C] text-[10px]">
                  USERS TRUST US
                </span>
              </div>
              <div className="w-1 md:w-2 h-px bg-binance-yellow my-auto ml-2"></div>
            </div>
          </div>
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
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-binance-dark fixed inset-0 z-50 pt-20">
          <div className="absolute top-4 right-4">
            <button 
              onClick={toggleMobileMenu}
              className="text-[#848E9C] hover:text-binance-yellow p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="px-4 py-4 space-y-4">
            <a 
              href="https://www.binance.com/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-[#848E9C] hover:text-binance-yellow py-3 border-b border-[#2B3139]"
            >
              Buy Crypto
            </a>
            <a 
              href="https://www.binance.com/en/markets" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-[#848E9C] hover:text-binance-yellow py-3 border-b border-[#2B3139]"
            >
              Markets
            </a>
            <a 
              href="https://www.binance.com/en/trade/BTC_USDT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-[#848E9C] hover:text-binance-yellow py-3 border-b border-[#2B3139]"
            >
              Trade
            </a>
            <a 
              href="https://www.binance.com/en/nft/home" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-[#848E9C] hover:text-binance-yellow py-3 border-b border-[#2B3139]"
            >
              NFT
            </a>
            <span className="block text-binance-yellow py-3 border-b border-[#2B3139]">Privacy Portal</span>
            
            {/* Added user counter for mobile */}
            <div className="flex items-center justify-center py-3 border-b border-[#2B3139]">
              <div className="w-4 h-px bg-binance-yellow my-auto mr-2"></div>
              <div className="flex flex-col items-center">
                <span className="text-binance-yellow text-xs font-semibold">
                  {formattedUserCount}
                </span>
                <span className="text-[#848E9C] text-[10px]">
                  USERS TRUST US
                </span>
              </div>
              <div className="w-4 h-px bg-binance-yellow my-auto ml-2"></div>
            </div>
            
            <div className="pt-6 flex flex-col space-y-3">
              <a
                href="https://accounts.binance.com/en/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 text-center text-binance-black bg-binance-yellow rounded-md font-medium"
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
