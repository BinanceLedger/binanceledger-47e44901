
import { FC, useState, useEffect } from "react";
import { X } from "lucide-react";

const BinanceAppPromotion: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  
  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroidDevice = /Android/.test(userAgent);
    
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    
    // Show the banner after a short delay to avoid immediate popup on first visit
    const timer = setTimeout(() => {
      // Check if user has dismissed the banner before
      const hasDismissed = localStorage.getItem('binanceAppPromoDismissed');
      if (!hasDismissed) {
        setIsVisible(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissPromo = () => {
    setIsVisible(false);
    // Remember user's choice not to show again for 7 days
    localStorage.setItem('binanceAppPromoDismissed', 'true');
    setTimeout(() => {
      localStorage.removeItem('binanceAppPromoDismissed');
    }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-binance-darkGray border-t border-gray-700 px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/2305aaf1-3270-45d9-be5c-1847f80351cc.png" 
            alt="Binance App" 
            className="h-10 w-10 mr-3"
          />
          <div className="text-left">
            <p className="text-white text-sm font-medium">Binance App</p>
            <p className="text-gray-400 text-xs">Secure, fast and elegant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isIOS && (
            <a 
              href="https://apps.apple.com/US/app/id1436799971" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-binance-yellow px-3 py-1 rounded text-binance-black text-xs font-medium"
            >
              App Store
            </a>
          )}
          
          {isAndroid && (
            <a 
              href="https://play.google.com/store/apps/details?id=com.binance.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-binance-yellow px-3 py-1 rounded text-binance-black text-xs font-medium"
            >
              Google Play
            </a>
          )}
          
          {!isIOS && !isAndroid && (
            <>
              <a 
                href="https://apps.apple.com/US/app/id1436799971" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-binance-yellow px-3 py-1 rounded text-binance-black text-xs font-medium"
              >
                App Store
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.binance.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-binance-yellow px-3 py-1 rounded text-binance-black text-xs font-medium"
              >
                Google Play
              </a>
            </>
          )}
          
          <button 
            onClick={dismissPromo}
            className="text-gray-400 hover:text-white ml-2" 
            aria-label="Close app promotion"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinanceAppPromotion;
