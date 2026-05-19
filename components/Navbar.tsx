import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 p-1.5 rounded-lg shadow-sm border border-zinc-800 dark:border-zinc-200 transition-all group-hover:bg-zinc-900 dark:group-hover:bg-zinc-200">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">SheetFlow</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-medium text-zinc-400">
                   {user.user_metadata?.full_name?.split(' ')[0] || 'Operator'}
                </span>
                <Link href="/dashboard" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all px-3 py-1.5 rounded-md hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 cursor-pointer">
                   Workspace
                </Link>
              </div>
              <SignOutButton />
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-md px-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-md px-3.5 text-xs font-medium shadow-sm transition-all cursor-pointer h-8 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950">
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
