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
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-muted/30">
      <div className="w-full max-w-[420px] space-y-6 relative">
        {/* Compact Logo Section */}
        <div className="flex flex-col items-center text-center space-y-3 mb-2">
           <Link href="/" className="group">
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
           </Link>
           <div className="space-y-0.5">
              <h1 className="text-xl font-black tracking-tight text-foreground uppercase italic">SheetFlow</h1>
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-muted-foreground tracking-widest opacity-60">
                 <ShieldCheck className="h-3 w-3" />
                 <span>SECURE PIPELINE</span>
              </div>
           </div>
        </div>

        <Card className="border shadow-sm rounded-lg overflow-hidden bg-background">
          <div className="h-1.5 bg-linear-to-r from-primary to-emerald-500 w-full" />
          <CardHeader className="space-y-1 pt-6 text-center">
            <CardTitle className="text-xl font-black tracking-tight uppercase italic">Authentication</CardTitle>
            <CardDescription className="text-xs font-medium">
              Access your automated workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg p-1 h-12 bg-muted/50 border">
                <TabsTrigger value="login" className="rounded-md text-xs font-black uppercase tracking-widest data-[state=active]:shadow-sm data-[state=active]:bg-background transition-all cursor-pointer">Sign In</TabsTrigger>
                <TabsTrigger value="register" className="rounded-md text-xs font-black uppercase tracking-widest data-[state=active]:shadow-sm data-[state=active]:bg-background transition-all cursor-pointer">Join</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="grid gap-5">
                  <div className="grid gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="email" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground ml-0.5">Work Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 h-11 rounded-lg border focus:border-primary transition-all bg-muted/5 focus:bg-background text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between ml-0.5">
                        <Label htmlFor="password" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Security Key</Label>
                        <Link href="#" className="text-[9px] font-black uppercase text-primary hover:underline">Forgot?</Link>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 h-11 rounded-lg border focus:border-primary transition-all bg-muted/5 focus:bg-background text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-11 cursor-pointer rounded-lg gap-2 shadow-md hover:shadow-primary/20 transition-all font-black text-xs uppercase tracking-widest group relative overflow-hidden" type="submit" disabled={isPending}>
                    <div className="absolute inset-0 bg-linear-to-r from-primary to-emerald-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10"></div>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                    Enter Workspace
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="grid gap-4">
                  <div className="grid gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="reg-name" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground ml-0.5">Full Identity</Label>
                      <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="reg-name"
                          type="text"
                          placeholder="Alex Rivera"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="pl-10 h-11 rounded-lg border focus:border-primary transition-all bg-muted/5 focus:bg-background text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="reg-email" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground ml-0.5">Work Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="alex@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 h-11 rounded-lg border focus:border-primary transition-all bg-muted/5 focus:bg-background text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center justify-between ml-0.5">
                        <Label htmlFor="reg-password" className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">New Security Key</Label>
                        <button
                          type="button"
                          onClick={suggestPassword}
                          className="text-[9px] font-black uppercase text-primary hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="h-3 w-3" />
                          Auto-Generate
                        </button>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Min 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 h-11 rounded-lg border focus:border-primary transition-all bg-muted/5 focus:bg-background text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-11 rounded-lg gap-2 shadow-md hover:shadow-primary/20 transition-all font-black text-xs uppercase tracking-widest group relative overflow-hidden mt-2" type="submit" disabled={isPending}>
                    <div className="absolute inset-0 bg-linear-to-r from-primary to-emerald-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10"></div>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                    Create Pipeline
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Compact Benefits */}
        <div className="grid grid-cols-3 gap-3">
           {[
             { icon: Zap, label: "Instant", color: "text-yellow-500" },
             { icon: ShieldCheck, label: "Secure", color: "text-emerald-500" },
             { icon: FileSpreadsheet, label: "Open", color: "text-primary" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                <item.icon className={cn("h-3.5 w-3.5", item.color)} />
                <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
