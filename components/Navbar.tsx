import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-zinc-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="bg-zinc-950 text-white p-1.5 rounded-lg shadow-sm border border-zinc-800 transition-all group-hover:bg-zinc-900">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-zinc-900 font-sans">SheetFlow</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-medium text-zinc-400">
                   {user.user_metadata?.full_name?.split(' ')[0] || 'Operator'}
                </span>
                <Link href="/dashboard" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-all px-3 py-1.5 rounded-md hover:bg-zinc-100/70 cursor-pointer">
                  Workspace
                </Link>
              </div>
              <SignOutButton />
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-md px-3 text-xs font-medium text-zinc-500 hover:text-zinc-900 cursor-pointer">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-md px-3.5 text-xs font-medium shadow-sm transition-all cursor-pointer h-8">
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
