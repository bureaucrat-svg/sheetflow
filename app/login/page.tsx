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
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 md:p-8 bg-[#f6f6f7]">
      <div className="w-full max-w-[440px] space-y-10 relative">
        {/* Branding Section */}
        <div className="flex flex-col items-center text-center space-y-4">
           <Link href="/" className="group">
              <div className="h-14 w-14 bg-white border border-[#e1e3e5] rounded-2xl flex items-center justify-center text-[#008060] shadow-xs group-hover:border-[#008060] transition-all duration-300">
                <FileSpreadsheet className="h-8 w-8" />
              </div>
           </Link>
           <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter text-[#202223] uppercase italic">SheetFlow</h1>
              <p className="text-[#6d7175] text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                 Administrative Portal
              </p>
           </div>
        </div>

        <Card className="border border-[#e1e3e5] shadow-xs rounded-lg overflow-hidden bg-white">
          <CardHeader className="space-y-1 pt-8 text-center px-10">
            <CardTitle className="text-xl font-black tracking-tighter text-[#202223] uppercase italic">Identity Verification</CardTitle>
            <CardDescription className="text-xs font-medium text-[#6d7175]">
              Access your automated data pipelines
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10 pt-4">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 rounded-lg p-1 h-11 bg-[#f1f2f3] border border-[#e1e3e5]">
                <TabsTrigger value="login" className="rounded-md text-[10px] font-black uppercase tracking-widest data-[state=active]:shadow-xs data-[state=active]:bg-white data-[state=active]:text-[#008060] transition-all">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="rounded-md text-[10px] font-black uppercase tracking-widest data-[state=active]:shadow-xs data-[state=active]:bg-white data-[state=active]:text-[#008060] transition-all">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="grid gap-6">
                  <div className="grid gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="font-black text-[9px] uppercase tracking-widest text-[#6d7175] ml-0.5">Account Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6d7175] group-focus-within:text-[#008060] transition-colors opacity-40" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@enterprise.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-11 h-12 rounded-lg border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] text-sm shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between ml-0.5">
                        <Label htmlFor="password" className="font-black text-[9px] uppercase tracking-widest text-[#6d7175]">Security Key</Label>
                        <Link href="#" className="text-[9px] font-black uppercase text-[#008060] hover:underline">Reset?</Link>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6d7175] group-focus-within:text-[#008060] transition-colors opacity-40" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-11 h-12 rounded-lg border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] text-sm shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-[#008060] hover:bg-[#006e52] text-white rounded-lg gap-3 shadow-sm font-black text-xs uppercase tracking-widest transition-all mt-2" type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                    Enter Pipeline
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="grid gap-5">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="reg-name" className="font-black text-[9px] uppercase tracking-widest text-[#6d7175] ml-0.5">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6d7175] group-focus-within:text-[#008060] transition-colors opacity-40" />
                        <Input
                          id="reg-name"
                          type="text"
                          placeholder="Sarah Connor"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="pl-11 h-12 rounded-lg border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] text-sm shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-email" className="font-black text-[9px] uppercase tracking-widest text-[#6d7175] ml-0.5">Work Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6d7175] group-focus-within:text-[#008060] transition-colors opacity-40" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="sarah@skynet.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-11 h-12 rounded-lg border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] text-sm shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between ml-0.5">
                        <Label htmlFor="reg-password" className="font-black text-[9px] uppercase tracking-widest text-[#6d7175]">Create Security Key</Label>
                        <button
                          type="button"
                          onClick={suggestPassword}
                          className="text-[9px] font-black uppercase text-[#008060] hover:underline flex items-center gap-1.5"
                        >
                          <Sparkles className="h-3 w-3" />
                          Suggest
                        </button>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6d7175] group-focus-within:text-[#008060] transition-colors opacity-40" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Minimum 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-11 h-12 rounded-lg border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] text-sm shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-[#008060] hover:bg-[#006e52] text-white rounded-lg gap-3 shadow-sm font-black text-xs uppercase tracking-widest transition-all mt-4" type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                    Deploy Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Verification Badges */}
        <div className="flex items-center justify-center gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
           <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#008060]" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Verified</span>
           </div>
           <div className="flex flex-col items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#008060]" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Realtime</span>
           </div>
           <div className="flex flex-col items-center gap-1.5">
              <FileSpreadsheet className="h-4 w-4 text-[#008060]" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Validated</span>
           </div>
        </div>
      </div>
    </div>
  );
}
