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
      className="rounded-lg px-5 cursor-pointer"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
