import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { SignOutButton } from "./SignOutButton";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-[#e1e3e5] bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-white border border-[#e1e3e5] p-1.5 rounded-lg text-[#008060] shadow-xs group-hover:border-[#008060] transition-all">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <span className="font-black text-lg tracking-tighter italic uppercase text-[#202223]">SheetFlow</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-[#6d7175] opacity-60">
                   {user.user_metadata?.full_name?.split(' ')[0] || 'Operator'}
                </span>
                <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-[#6d7175] hover:text-[#008060] transition-all px-3 py-2 rounded-lg hover:bg-[#f6f6f7] cursor-pointer">
                  Workspace
                </Link>
              </div>
              <SignOutButton />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-lg px-5 text-[10px] font-black uppercase tracking-widest text-[#6d7175] hover:text-[#202223] cursor-pointer">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-[#008060] hover:bg-[#006e52] text-white rounded-lg px-6 text-[10px] font-black uppercase tracking-widest shadow-xs transition-all cursor-pointer">
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
