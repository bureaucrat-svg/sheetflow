"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed out successfully");
      router.refresh();
      router.push("/login");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="rounded-md px-3 text-xs font-medium border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer h-8"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
