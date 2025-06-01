
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const BinanceHeader: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { isAuthenticated, userEmail, logout } = useAuth();

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

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-md">
            <User size={16} className="text-green-500" />
            <span className="text-green-500 text-sm">Logged in</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-[#848E9C] hover:text-binance-yellow transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center space-x-4">
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
    );
  };

  const renderMobileAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="pt-6">
          <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/20 border border-green-500 rounded-md mb-3">
            <User size={16} className="text-green-500" />
            <span className="text-green-500">Logged in</span>
          </div>
          <button
            onClick={logout}
            className="w-full px-4 py-3 text-center text-[#848E9C] hover:text-binance-yellow border border-[#848E9C] rounded-md"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="pt-6 flex gap-3">
        <a
          href="https://accounts.binance.com/en/login"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-3 text-center text-binance-black bg-binance-yellow rounded-md font-medium"
        >
          Login
        </a>
        <a
          href="https://accounts.binance.com/en/register"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-3 text-center border border-binance-yellow text-binance-yellow rounded-md font-medium"
        >
          Register
        </a>
      </div>
    );
  };

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
            <span className="text-binance-yellow">Binance Ledger</span>
          </nav>
        </div>
        
        {renderAuthButtons()}

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
            <span className="block text-binance-yellow py-3 border-b border-[#2B3139]">Binance Ledger</span>
            
            {renderMobileAuthButtons()}
          </div>
        </div>
      )}
    </header>
  );
};

export default BinanceHeader;
