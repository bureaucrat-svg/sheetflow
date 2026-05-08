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
  const { endpoint_id } = await params;

  const endpoint = await prisma.endpoint.findUnique({
    where: { id: endpoint_id, userId: user?.id },
  });

  if (!endpoint) {
    notFound();
  }

  return (
    <div className="container py-10">
      <ManageEndpointForm endpoint={endpoint} />
    </div>
  );
}
