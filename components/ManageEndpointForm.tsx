"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Copy, Check, ExternalLink, Trash2, Save, FileCode, HelpCircle, Lightbulb, PlayCircle, Info } from "lucide-react";
import { updateEndpointAction, deleteEndpointAction } from "@/app/actions/endpoint";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const GOOGLE_SCRIPT_TEMPLATE = `function doPost(e) {
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
}`;

export function ManageEndpointForm({ endpoint }: { endpoint: any }) {
  const [googleScriptUrl, setGoogleScriptUrl] = useState(endpoint.googleScriptUrl || "");
  const [isActive, setIsActive] = useState(endpoint.isActive);
  const [isPending, setIsPending] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const captureUrl = `${window.location.origin}/api/v1/capture/${endpoint.id}`;

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
    toast.success("Copied to clipboard");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("googleScriptUrl", googleScriptUrl);
    formData.append("isActive", isActive ? "true" : "false");

    try {
      await updateEndpointAction(endpoint.id, formData);
      toast.success("Settings updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    setIsPending(true);
    try {
      await deleteEndpointAction(endpoint.id);
      toast.success("Endpoint deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-32">
      {/* Header Info */}
      <div className="bg-primary/5 p-8 md:p-12 rounded-lg border border-primary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg">
                <Lightbulb className="h-6 w-6" />
             </div>
             <h1 className="text-4xl font-bold tracking-tight">{endpoint.name}</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-lg">
             Follow the steps below to connect your data source to your Google Sheet.
          </p>
        </div>
        <div className="flex gap-3">
           <Badge variant={isActive ? "outline" : "destructive"} className={isActive ? "bg-emerald-50 text-emerald-600 border-emerald-200 rounded-lg px-5 py-1 text-sm" : "rounded-lg px-5 py-1 text-sm"}>
              {isActive ? "✓ Flowing" : "Paused"}
           </Badge>
           <Button variant="ghost" size="icon" className="rounded-lg h-10 w-10 text-destructive hover:bg-destructive/10" onClick={handleDelete} disabled={isPending}>
             <Trash2 className="h-5 w-5" />
           </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-10">
          
          {/* Step 1: Copy Capture URL */}
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">1</div>
                <h3 className="text-2xl font-bold">Your Secret Webhook Link</h3>
             </div>
             <Card className="rounded-lg border shadow-md overflow-hidden bg-background">
                <CardContent className="p-8 space-y-6">
                   <p className="text-muted-foreground leading-relaxed">
                      Copy this link and paste it into the "Webhook URL" settings of the app you want to collect data from (like Stripe, Shopify, or Typeform).
                   </p>
                   <div className="flex gap-3 bg-muted/40 p-2 rounded-lg border items-center">
                      <Input value={captureUrl} readOnly className="border-none bg-transparent font-mono text-sm focus-visible:ring-0 shadow-none" />
                      <Button className="rounded-lg h-11 px-6 gap-2" onClick={() => copyToClipboard(captureUrl, setCopiedUrl)}>
                        {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copiedUrl ? "Copied" : "Copy Link"}
                      </Button>
                   </div>
                   <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-blue-700 text-sm">
                      <Info className="h-5 w-5 shrink-0 mt-0.5" />
                      <p>This link is unique to <b>{endpoint.name}</b>. When data hits this link, we check if it matches your fields before sending it to your sheet.</p>
                   </div>
                </CardContent>
             </Card>
          </div>

          {/* Step 2: Configuration */}
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">2</div>
                <h3 className="text-2xl font-bold">Destination Settings</h3>
             </div>
             <form onSubmit={handleUpdate}>
                <Card className="rounded-lg border shadow-md overflow-hidden bg-background">
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-4">
                      <Label htmlFor="googleUrl" className="text-lg font-bold">Google Sheet "Web App" URL</Label>
                      <Input
                        id="googleUrl"
                        placeholder="https://script.google.com/macros/s/.../exec"
                        value={googleScriptUrl}
                        onChange={(e) => setGoogleScriptUrl(e.target.value)}
                        className="h-14 rounded-lg text-base border-2 focus:border-primary transition-all"
                      />
                      <div className="flex items-center gap-2 text-sm text-amber-600 font-medium px-1">
                        <PlayCircle className="h-4 w-4" />
                        <span>You'll get this URL after following the "Sheet Setup" guide on the right.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-8 rounded-lg bg-muted/20 border-2 border-dashed">
                      <div className="space-y-1">
                        <Label className="text-lg font-bold">Flow Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Turn this off to temporarily stop sending data to your spreadsheet.
                        </p>
                      </div>
                      <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                        className="scale-150 data-[state=checked]:bg-emerald-500"
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                       <Button type="submit" disabled={isPending} size="lg" className="rounded-lg h-14 px-10 gap-2 shadow-lg hover:shadow-xl transition-all">
                        <Save className="h-5 w-5" />
                        {isPending ? "Saving..." : "Save Connection"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
             </form>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4 sticky top-24">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-yellow-500 text-white flex items-center justify-center">
                   <FileCode className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Google Sheet Setup</h3>
             </div>
             <Card className="rounded-lg border shadow-lg overflow-hidden bg-background">
                <CardHeader className="bg-yellow-500/5 pb-6 border-b">
                   <CardDescription className="text-foreground font-medium">
                      Follow these 6 steps to prepare your spreadsheet. No programming skills required.
                   </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <ol className="space-y-6">
                       {[
                         { step: "Open your Google Sheet", desc: "Create a new sheet or open an existing one." },
                         { step: "Open Apps Script", desc: 'Go to <b>Extensions > Apps Script</b> in the top menu.' },
                         { step: "Paste the Code", desc: "Delete everything in the editor and paste the code block below." },
                         { step: "Click Deploy", desc: 'Click <b>Deploy > New Deployment</b> (Blue button).' },
                         { step: "Configure Web App", desc: 'Select <b>Web App</b>. Change "Who has access" to <b>Anyone</b>.' },
                         { step: "Copy Web App URL", desc: 'Copy the URL provided and paste it in Step 2 on the left.' }
                       ].map((item, i) => (
                         <li key={i} className="flex gap-4">
                            <span className="flex-none h-6 w-6 rounded-lg bg-yellow-500 text-white text-[10px] font-bold flex items-center justify-center mt-1">{i+1}</span>
                            <div className="space-y-1">
                               <p className="font-bold text-sm leading-none">{item.step}</p>
                               <p className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                            </div>
                         </li>
                       ))}
                    </ol>

                    <div className="pt-4 space-y-3">
                       <Label className="text-sm font-bold flex items-center gap-2">
                          <Copy className="h-4 w-4 text-primary" />
                          Copy this code for Step 3:
                       </Label>
                       <div className="rounded-lg bg-zinc-950 p-5 font-mono text-[10px] leading-relaxed text-zinc-400 overflow-hidden relative group">
                          <pre className="max-h-[200px] overflow-y-auto"><code>{GOOGLE_SCRIPT_TEMPLATE}</code></pre>
                          <div className="absolute top-3 right-3">
                             <Button size="icon" variant="secondary" className="rounded-lg h-8 w-8" onClick={() => copyToClipboard(GOOGLE_SCRIPT_TEMPLATE, setCopiedScript)}>
                                {copiedScript ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                             </Button>
                          </div>
                       </div>
                    </div>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
