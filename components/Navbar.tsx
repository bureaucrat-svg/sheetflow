import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
          </div>
          <span>SheetFlow</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-primary/5 cursor-pointer">
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <div className="flex items-center gap-1 md:gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-lg px-3 md:px-5 cursor-pointer">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="rounded-lg px-4 md:px-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
