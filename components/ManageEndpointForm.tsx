"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Copy, Check, ExternalLink, Trash2, Save, FileCode, HelpCircle, Lightbulb, PlayCircle, Info, Sparkles, Database, Link as LinkIcon, ShieldCheck, Zap, ArrowLeft, Code } from "lucide-react";
import { updateEndpointAction, deleteEndpointAction } from "@/app/actions/endpoint";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  const [activeTab, setActiveTab] = useState<"curl" | "python" | "nextjs">("curl");
  const [copiedExample, setCopiedExample] = useState(false);
  const [captureUrl, setCaptureUrl] = useState("");

  useEffect(() => {
    setCaptureUrl(`${window.location.origin}/api/v1/capture/${endpoint.id}`);
  }, [endpoint.id]);
  
  // Generate example JSON based on schema
  const exampleJson = (endpoint.schema as any[] || []).reduce((acc, field) => {
    acc[field.name] = field.type === "number" ? 42 : field.type === "boolean" ? true : "example_value";
    return acc;
  }, {} as any);

  const usageExamples = {
    curl: `curl -X POST "${captureUrl}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(exampleJson, null, 2)}'`,
    python: `import requests

url = "${captureUrl}"
data = ${JSON.stringify(exampleJson, null, 4)}

response = requests.post(url, json=data)
print(response.json())`,
    nextjs: `// Next.js / Node.js example
const response = await fetch("${captureUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(${JSON.stringify(exampleJson, null, 2)})
});

const result = await response.json();
console.log(result);`
  };

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
      toast.success("Settings updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this flow? This action cannot be undone.")) return;
    
    setIsPending(true);
    try {
      await deleteEndpointAction(endpoint.id);
      toast.success("Flow deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete flow");
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-32 px-4">
      {/* Compact Header */}
      <div className="relative group mt-6">
        <div className="relative bg-background p-6 rounded-lg border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <Link href="/dashboard">
                <Button variant="outline" size="icon" className="rounded-lg h-10 w-10 border hover:bg-muted/50 transition-all">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
             </Link>
             <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center text-white shadow-md">
                   <Sparkles className="h-6 w-6" />
                </div>
                <div>
                   <h1 className="text-2xl font-black tracking-tight uppercase italic">{endpoint.name}</h1>
                   <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant={isActive ? "success" : "secondary"}>
                         {isActive ? "Active" : "Paused"}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-mono opacity-60">ID: {endpoint.id}</span>
                   </div>
                </div>
             </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg h-10 px-4 gap-2 border text-destructive border-destructive/10 hover:bg-destructive/5 transition-all w-full md:w-auto font-black text-[10px] uppercase tracking-widest" onClick={handleDelete} disabled={isPending}>
             <Trash2 className="h-4 w-4" />
             Delete Flow
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Webhook Link - Compact */}
          <section className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <div className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center text-[10px] font-black shadow-sm">1</div>
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Secret Webhook Link</h3>
             </div>
             <Card className="rounded-lg border shadow-sm overflow-hidden bg-background">
                <CardContent className="p-6 space-y-6">
                   <div className="space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                         Send POST requests to this URL to push data to your Google Sheet.
                      </p>
                      <div className="flex gap-2 bg-muted/20 p-2 rounded-lg border border-dashed focus-within:border-primary/50 transition-all">
                         <Input value={captureUrl} readOnly className="border-none bg-transparent font-mono text-xs focus-visible:ring-0 shadow-none h-9" />
                         <Button size="sm" className="rounded-lg h-9 px-4 gap-2 font-black text-[10px] uppercase tracking-widest shadow-sm" onClick={() => copyToClipboard(captureUrl, setCopiedUrl)}>
                           {copiedUrl ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                           {copiedUrl ? "Copied" : "Copy"}
                         </Button>
                      </div>
                   </div>

                   {/* Usage Examples Tabs */}
                   <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center justify-between">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Code className="h-3.5 w-3.5" />
                            Implementation Examples
                         </Label>
                         <div className="flex bg-muted/50 p-1 rounded-md border">
                            {(["curl", "python", "nextjs"] as const).map((tab) => (
                               <button
                                 key={tab}
                                 onClick={() => setActiveTab(tab)}
                                 className={cn(
                                   "px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all",
                                   activeTab === tab ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                                 )}
                               >
                                 {tab === "nextjs" ? "Next.js" : tab}
                               </button>
                            ))}
                         </div>
                      </div>
                      <div className="rounded-lg bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-hidden relative border border-zinc-800 shadow-inner group">
                         <pre className="max-h-[250px] overflow-auto custom-scrollbar pt-2"><code>{usageExamples[activeTab]}</code></pre>
                         <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="rounded-md h-8 w-8 shadow-md border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300" onClick={() => copyToClipboard(usageExamples[activeTab], setCopiedExample)}>
                               {copiedExample ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                            </Button>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </section>

          {/* Step 2: Destination - Compact */}
          <section className="space-y-4">
             <div className="flex items-center gap-2 px-1">
                <div className="h-6 w-6 rounded-md bg-foreground text-background flex items-center justify-center text-[10px] font-black shadow-sm">2</div>
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Destination Settings</h3>
             </div>
             <form onSubmit={handleUpdate}>
                <Card className="rounded-lg border shadow-sm overflow-hidden bg-background">
                  <CardContent className="p-6 space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="googleUrl" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                         <FileCode className="h-3.5 w-3.5 text-emerald-600" />
                         Google Script URL
                      </Label>
                      <Input
                        id="googleUrl"
                        placeholder="https://script.google.com/macros/s/.../exec"
                        value={googleScriptUrl}
                        onChange={(e) => setGoogleScriptUrl(e.target.value)}
                        className="h-11 rounded-lg text-sm border focus:border-primary transition-all bg-muted/5 font-mono"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-5 rounded-lg bg-muted/10 border border-dashed">
                      <div className="space-y-0.5">
                        <Label className="text-xs font-black uppercase tracking-widest">Flow Status</Label>
                        <p className="text-[10px] text-muted-foreground opacity-60">
                          Instantly pause or resume the data stream.
                        </p>
                      </div>
                      <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                        className="scale-90 data-[state=checked]:bg-emerald-500"
                      />
                    </div>

                    <Button type="submit" disabled={isPending} size="lg" className="w-full rounded-lg h-12 px-10 gap-2 shadow-md hover:shadow-primary/20 transition-all font-black text-xs uppercase tracking-widest group overflow-hidden relative">
                       <div className="absolute inset-0 bg-linear-to-r from-primary to-emerald-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10"></div>
                       <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
                       {isPending ? "Saving..." : "Save Connection Settings"}
                    </Button>
                  </CardContent>
                </Card>
             </form>
          </section>
        </div>

        {/* Sidebar: Instructions - Compact */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 space-y-6">
             <Card className="rounded-lg border shadow-sm overflow-hidden bg-background">
                <CardHeader className="bg-muted/30 pb-4 pt-4 border-b">
                   <CardTitle className="text-[10px] font-black flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                      <LinkIcon className="h-4 w-4" />
                      Sheet Setup Guide
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 space-y-6">
                    <ol className="space-y-4">
                       {[
                         { step: "Spreadsheet", desc: "Open your target Google Sheet." },
                         { step: "Apps Script", desc: 'Go to <span className="font-bold">Extensions > Apps Script</span>.' },
                         { step: "Deployment", desc: 'Delete all code and paste the block below.' },
                         { step: "Authorization", desc: 'Click <span className="font-bold">Deploy > New Deployment</span>.' },
                         { step: "Access", desc: 'Select <span className="font-bold text-blue-600">Web App</span> and set access to <span className="font-bold text-blue-600">Anyone</span>.' },
                         { step: "Finalize", desc: 'Copy the URL into <span className="font-bold">Step 2</span>.' }
                       ].map((item, i) => (
                         <li key={i} className="flex gap-4">
                            <span className="flex-none h-6 w-6 rounded-md bg-muted text-muted-foreground text-[10px] font-black flex items-center justify-center border">
                               {i+1}
                            </span>
                            <div className="space-y-0.5">
                               <p className="font-black text-[10px] uppercase tracking-widest">{item.step}</p>
                               <p className="text-[11px] text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                            </div>
                         </li>
                       ))}
                    </ol>

                    <div className="pt-4 space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Database className="h-3.5 w-3.5" />
                          App Script Template
                       </Label>
                       <div className="rounded-lg bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-hidden relative border border-zinc-800 shadow-inner group">
                          <pre className="max-h-[300px] overflow-auto custom-scrollbar pt-2"><code>{GOOGLE_SCRIPT_TEMPLATE}</code></pre>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button size="icon" variant="secondary" className="rounded-md h-8 w-8 shadow-md border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300" onClick={() => copyToClipboard(GOOGLE_SCRIPT_TEMPLATE, setCopiedScript)}>
                                {copiedScript ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
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

// Local Badge helper
function Badge({ variant, children, className }: { variant: "success" | "secondary" | "destructive" | "outline", children: React.ReactNode, className?: string }) {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    secondary: "bg-muted text-muted-foreground border-transparent",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "bg-transparent text-foreground border-border"
  };
  
  return (
    <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all", variants[variant], className)}>
      {children}
    </span>
  );
}
