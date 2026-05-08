import { NewEndpointForm } from "@/components/NewEndpointForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewEndpointPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-64px)]">
      <div className="container py-10 px-4 md:px-6">
        <NewEndpointForm />
      </div>
    </div>
  );
}
