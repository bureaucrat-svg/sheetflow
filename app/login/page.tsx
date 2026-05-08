"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Loader2, UserPlus, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const supabase = createClient();

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
      },
    });

    setIsPending(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your email for confirmation.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10 md:py-20">
      <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4">
        <div className="w-[500px] h-[500px] bg-primary/5 rounded-lg blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md shadow-2xl rounded-lg border-none bg-background overflow-hidden">
        <div className="h-3 bg-primary w-full" />
        <CardHeader className="text-center pt-10">
          <CardTitle className="text-3xl font-bold tracking-tight">SheetFlow</CardTitle>
          <CardDescription className="text-lg">
            Manage your webhooks with ease
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-lg p-1 h-12 bg-muted/50">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:shadow-md">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg data-[state=active]:shadow-md">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="grid gap-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-11 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 h-11 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-lg gap-2 shadow-lg hover:shadow-xl transition-all" type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="grid gap-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-11 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 h-11 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-lg gap-2 shadow-lg hover:shadow-xl transition-all" type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  Create Account
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2 px-4">
                  By signing up, you agree to receive a confirmation email.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
