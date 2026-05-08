"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FieldSchema = z.object({
  name: z.string().min(1).regex(/^[a-zA-Z0-9_]+$/, "Field name must only contain letters, numbers, and underscores (no spaces)"),
  type: z.enum(["string", "number", "boolean"]),
  required: z.boolean(),
});

const CreateEndpointSchema = z.object({
  name: z.string().min(1),
  fields: z.array(FieldSchema).min(1),
});

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized");

  // Sync user to Prisma
  await prisma.user.upsert({
    where: { id: user.id },
    update: { email: user.email },
    create: { id: user.id, email: user.email },
  });

  return user;
}

export async function createEndpointAction(formData: FormData) {
  const user = await getAuthenticatedUser();

  const name = formData.get("name") as string;
  const fieldsJson = formData.get("fields") as string;
  const fields = JSON.parse(fieldsJson);

  const validated = CreateEndpointSchema.parse({ name, fields });

  await prisma.endpoint.create({
    data: {
      userId: user.id,
      name: validated.name,
      schema: validated.fields,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateEndpointAction(id: string, formData: FormData) {
  const user = await getAuthenticatedUser();

  const googleScriptUrl = formData.get("googleScriptUrl") as string;
  const isActive = formData.get("isActive") === "true";

  await prisma.endpoint.update({
    where: { id, userId: user.id },
    data: {
      googleScriptUrl: googleScriptUrl || null,
      isActive,
    },
  });

  revalidatePath(`/dashboard/endpoint/${id}`);
  revalidatePath("/dashboard");
}

export async function deleteEndpointAction(id: string) {
  const user = await getAuthenticatedUser();

  await prisma.endpoint.delete({
    where: { id, userId: user.id },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
