"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2, UserPlus, LogIn, User, Sparkles, FileSpreadsheet, ShieldCheck, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const supabase = createClient();

  const suggestPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let newPass = "";
    for (let i = 0; i < 12; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
    toast.success("Strong password suggested!");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");

    setIsPending(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsPending(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      window.location.href = "/dashboard";
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    setIsPending(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
        }
      },
    });

    setIsPending(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome to SheetFlow!");
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] w-full flex items-center justify-center p-4 md:p-8 bg-transparent relative">
      <div className="w-full max-w-[390px] space-y-6 relative z-10">
        
        {/* Branding Logo Block */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
           <div className="h-8 w-8 bg-zinc-950 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 rounded-lg flex items-center justify-center text-white dark:text-zinc-950 shadow-sm">
             <FileSpreadsheet className="h-4 w-4" />
           </div>
           <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">SheetFlow</span>
        </div>

        {/* Identity Card Container */}
        <Card className="border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] rounded-xl overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
          <CardHeader className="space-y-1.5 pt-6 text-center px-6">
            <CardTitle className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Welcome back</CardTitle>
            <CardDescription className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
               Sign in to manage your spreadsheet automations
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-2">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg p-1 h-9 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/40 dark:border-zinc-800/40">
                <TabsTrigger value="login" className="rounded-md text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-tight data-[state=active]:shadow-sm data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 transition-all cursor-pointer">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="rounded-md text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-tight data-[state=active]:shadow-sm data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 transition-all cursor-pointer">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="focus-visible:outline-none">
                <form onSubmit={handleLogin} className="grid gap-4">
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="email" className="font-medium text-[10px] uppercase tracking-wider text-zinc-400 ml-0.5">Account Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 transition-colors opacity-60 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-9 h-10 rounded-lg border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-50 transition-all bg-zinc-50 dark:bg-zinc-900/40 text-xs shadow-none text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between ml-0.5">
                        <Label htmlFor="password" className="font-medium text-[10px] uppercase tracking-wider text-zinc-400">Security Key</Label>
                        <Link href="#" className="text-[10px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:underline">Forgot?</Link>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 transition-colors opacity-60 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-9 h-10 rounded-lg border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-50 transition-all bg-zinc-50 dark:bg-zinc-900/40 text-xs shadow-none text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-10 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg gap-2 shadow-sm font-medium text-xs tracking-tight transition-all mt-2 cursor-pointer" type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogIn className="h-3.5 w-3.5" />}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="focus-visible:outline-none">
                <form onSubmit={handleSignUp} className="grid gap-4">
                  <div className="grid gap-3.5">
                    <div className="grid gap-1.5">
                      <Label htmlFor="reg-name" className="font-medium text-[10px] uppercase tracking-wider text-zinc-400 ml-0.5">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 transition-colors opacity-60 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50" />
                        <Input
                          id="reg-name"
                          type="text"
                          placeholder="Sarah Connor"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="pl-9 h-10 rounded-lg border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-50 transition-all bg-zinc-50 dark:bg-zinc-900/40 text-xs shadow-none text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="reg-email" className="font-medium text-[10px] uppercase tracking-wider text-zinc-400 ml-0.5">Work Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 transition-colors opacity-60 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="sarah@skynet.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-9 h-10 rounded-lg border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-50 transition-all bg-zinc-50 dark:bg-zinc-900/40 text-xs shadow-none text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between ml-0.5">
                        <Label htmlFor="reg-password" className="font-medium text-[10px] uppercase tracking-wider text-zinc-400">Security Key</Label>
                        <button
                          type="button"
                          onClick={suggestPassword}
                          className="text-[10px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="h-2.5 w-2.5" />
                          Suggest
                        </button>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 transition-colors opacity-60 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Minimum 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-9 h-10 rounded-lg border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-50 transition-all bg-zinc-50 dark:bg-zinc-900/40 text-xs shadow-none text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-10 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg gap-2 shadow-sm font-medium text-xs tracking-tight transition-all mt-3 cursor-pointer" type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserPlus className="h-3.5 w-3.5" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Verification Status Badges */}
        <div className="flex items-center justify-center gap-6 opacity-35 hover:opacity-75 transition-opacity duration-300">
           <div className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-800 dark:text-zinc-200" />
              <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Encrypted</span>
           </div>
           <div className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-zinc-800 dark:text-zinc-200" />
              <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">Realtime</span>
           </div>
        </div>
      </div>
    </div>
  );
}
