import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { ManageEndpointForm } from "@/components/ManageEndpointForm";
import { notFound } from "next/navigation";

export default async function ManageEndpointPage({
  params,
}: {
  params: Promise<{ endpoint_id: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  const { endpoint_id } = await params;

  const endpoint = await prisma.endpoint.findUnique({
    where: { id: endpoint_id, userId: user?.id },
  });

  if (!endpoint) {
    notFound();
  }

  return (
    <div className="bg-transparent min-h-[calc(100vh-64px)]">
      <div className="container py-10 px-4 md:px-6">
        <ManageEndpointForm endpoint={endpoint} />
      </div>
    </div>
  );
}
