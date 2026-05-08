import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ endpoint_id: string }> }
) {
  try {
    const { endpoint_id } = await params;

    const endpoint = await prisma.endpoint.findUnique({
      where: { id: endpoint_id },
    });

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
    }

    if (!endpoint.isActive) {
      return NextResponse.json({ error: "Endpoint is inactive" }, { status: 403 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // Dynamically build Zod schema
    const schemaDefinition = endpoint.schema as any[];
    const shape: Record<string, any> = {};

    schemaDefinition.forEach((field) => {
      let fieldSchema;
      switch (field.type) {
        case "string":
          fieldSchema = z.string();
          break;
        case "number":
          fieldSchema = z.number();
          break;
        case "boolean":
          fieldSchema = z.boolean();
          break;
        default:
          fieldSchema = z.any();
      }

      if (field.required) {
        shape[field.name] = fieldSchema;
      } else {
        shape[field.name] = fieldSchema.optional();
      }
    });

    const dynamicSchema = z.object(shape);
    const validationResult = dynamicSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    // Forward to Google Script URL if available
    if (endpoint.googleScriptUrl) {
      try {
        const response = await axios.post(endpoint.googleScriptUrl, validationResult.data, {
          timeout: 10000, // Increase timeout to 10 seconds
        });
        console.log("Google Script Response:", response.status, response.data);
      } catch (error: any) {
        console.error("Failed to forward to Google Script:", error.message);
        if (error.response) {
          console.error("Google Script Error Response:", error.response.status, error.response.data);
        }
        return NextResponse.json({ 
          status: "partial_success", 
          error: "Failed to forward to Google Sheets",
          details: error.message 
        }, { status: 502 });
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("API Capture Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
