Act as a Senior Full-Stack Engineer expert in Next.js (App Router), React, Prisma, Supabase (PostgreSQL), Auth.js, and Tailwind CSS. I need you to build a production-level application that acts as a custom, schema-validated webhook forwarder to Google Sheets.

**Important Context:** I have already initialized the application using `npx create-next-app@latest`. Skip basic framework setup instructions and focus on providing the exact code for the necessary files.

### **Tech Stack**
*   **Framework:** Next.js (App Router)
*   **Authentication:** Auth.js (NextAuth v5)
*   **Database:** Supabase (PostgreSQL)
*   **ORM:** Prisma
*   **Styling:** Tailwind CSS + shadcn/ui
*   **Validation:** Zod

### **Core Workflows to Implement**

1.  **Authentication:**
    *   Implement Auth.js for user login (e.g., Google or GitHub OAuth, plus Magic Links if possible).

2.  **Endpoint Creation & Schema Definition:**
    *   A protected UI where authenticated users can create a new endpoint.
    *   A schema builder UI where users add fields (e.g., Field Name: "Email", Type: "String", Required: True).
    *   The app generates a unique Next.js API route URL for this endpoint (e.g., `https://our-app.com/api/v1/capture/[endpoint_id]`).

3.  **Google Apps Script Integration:**
    *   Provide the user with the Google Apps Script snippet (detailed below) to paste into their Google Sheet.
    *   Provide an input field in the UI for the user to save their generated Google Web App URL to their endpoint configuration.

4.  **Data Ingestion & Forwarding (The API Route):**
    *   Create a dynamic API route: `/api/v1/capture/[endpoint_id]` handling `POST` requests.
    *   **Logic:**
        1. Fetch the endpoint configuration from Supabase via Prisma.
        2. Dynamically generate a Zod schema based on the saved JSON schema.
        3. Validate incoming request body. Return `400 Bad Request` with Zod errors if invalid.
        4. If valid, make a `POST` request to the user's saved Google Web App URL with the payload.
        5. Return a `200 OK` response.

### **Database Schema (Prisma)**
Please generate the `schema.prisma` file incorporating standard Auth.js models alongside the custom logic:
*   `User`, `Account`, `Session`, `VerificationToken`: Standard Auth.js required models.
*   `Endpoint`: 
    *   `id` (UUID)
    *   `userId` (Relation to User)
    *   `name` (String)
    *   `schema` (JSON - stores the array of fields and types)
    *   `googleScriptUrl` (String, nullable)
    *   `isActive` (Boolean)
    *   `createdAt` (DateTime)

### **Google Apps Script Template**
Include a UI component that displays this code block with a "Copy to Clipboard" button:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      const headers = Object.keys(data);
      headers.push("Timestamp");
      sheet.appendRow(headers);
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = headers.map(header => {
      if (header === "Timestamp") return new Date();
      return data[header] !== undefined ? data[header] : "";
    });
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}