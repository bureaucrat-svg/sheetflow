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
    <div className="bg-[#f6f6f7] min-h-[calc(100vh-64px)] pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#e1e3e5] pb-8">
          <div className="flex items-center gap-5">
             <Link href="/dashboard">
                <Button variant="outline" size="icon" className="rounded-lg h-10 w-10 border-[#e1e3e5] bg-white hover:bg-[#f6f6f7] transition-all shadow-xs">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
             </Link>
             <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter text-[#202223] uppercase italic">{endpoint.name}</h1>
                <div className="flex items-center gap-3">
                   <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight border",
                      isActive ? "bg-[#e3f1df] border-[#bbe5b3] text-[#008060]" : "bg-[#f1f2f3] border-[#e1e3e5] text-[#6d7175]"
                   )}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", isActive ? "bg-[#008060] animate-pulse" : "bg-[#6d7175]")}></span>
                      {isActive ? "Running" : "Paused"}
                   </div>
                   <span className="text-[10px] font-mono text-[#6d7175] opacity-50">ID: {endpoint.id}</span>
                </div>
             </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg h-10 px-5 gap-2 border-[#e1e3e5] bg-white text-[#d72c0d] hover:bg-[#fff4f2] hover:border-[#f8d7da] transition-all font-black text-[10px] uppercase tracking-widest shadow-xs" onClick={handleDelete} disabled={isPending}>
             <Trash2 className="h-4 w-4" />
             Delete Flow
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            
            {/* Section 1: Inbound Webhook */}
            <section className="space-y-5">
               <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded bg-[#202223] text-white flex items-center justify-center text-[10px] font-black shadow-sm">1</div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[#6d7175]">Your Webhook URL</h3>
               </div>
               <Card className="rounded-lg border-[#e1e3e5] shadow-xs overflow-hidden bg-white">
                  <CardContent className="p-8 space-y-8">
                     <div className="space-y-4">
                        <p className="text-sm text-[#6d7175] font-medium leading-relaxed">
                           Send your data to this unique URL. We'll check every piece of information to make sure it's correct before adding it to your sheet.
                        </p>
                        <div className="flex gap-2 bg-[#f9fafb] p-2.5 rounded-lg border border-[#e1e3e5] border-dashed focus-within:border-[#008060] transition-all">
                           <Input value={captureUrl} readOnly className="border-none bg-transparent font-mono text-[11px] focus-visible:ring-0 shadow-none h-9 text-[#202223]" />
                           <Button size="sm" className="bg-[#202223] hover:bg-black text-white rounded-lg h-9 px-5 gap-2 font-black text-[10px] uppercase tracking-widest shadow-sm transition-all" onClick={() => copyToClipboard(captureUrl, setCopiedUrl)}>
                             {copiedUrl ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                             {copiedUrl ? "Copied" : "Copy URL"}
                           </Button>
                        </div>
                     </div>

                     {/* Implementation Tabs */}
                     <div className="space-y-4 pt-8 border-t border-[#f1f2f3]">
                        <div className="flex items-center justify-between">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-[#6d7175] flex items-center gap-2">
                              <Code className="h-3.5 w-3.5" />
                              SDK Implementation
                           </Label>
                           <div className="flex bg-[#f1f2f3] p-1 rounded-lg border border-[#e1e3e5]">
                              {(["curl", "python", "nextjs"] as const).map((tab) => (
                                 <button
                                   key={tab}
                                   onClick={() => setActiveTab(tab)}
                                   className={cn(
                                     "px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all",
                                     activeTab === tab ? "bg-white shadow-xs text-[#008060]" : "text-[#6d7175] hover:text-[#202223]"
                                   )}
                                 >
                                   {tab === "nextjs" ? "Next.js" : tab}
                                 </button>
                              ))}
                           </div>
                        </div>
                        <div className="rounded-lg bg-[#0b0c0d] p-5 font-mono text-[11px] leading-relaxed text-[#aeb4b9] overflow-hidden relative border border-[#1a1c1d] shadow-inner group">
                           <pre className="max-h-[250px] overflow-auto custom-scrollbar pt-2"><code>{usageExamples[activeTab]}</code></pre>
                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="icon" variant="secondary" className="rounded-md h-8 w-8 shadow-md border-[#333] bg-[#1a1c1d] hover:bg-[#2a2c2d] text-white" onClick={() => copyToClipboard(usageExamples[activeTab], setCopiedExample)}>
                                 {copiedExample ? <Check className="h-3.5 w-3.5 text-[#008060]" /> : <Copy className="h-3.5 w-3.5" />}
                              </Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </section>

            {/* Section 2: Destination */}
            <section className="space-y-5">
               <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded bg-[#202223] text-white flex items-center justify-center text-[10px] font-black shadow-sm">2</div>
                  <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[#6d7175]">Google Sheets Connection</h3>
               </div>
               <form onSubmit={handleUpdate}>
                  <Card className="rounded-lg border-[#e1e3e5] shadow-xs overflow-hidden bg-white">
                    <CardContent className="p-8 space-y-10">
                      <div className="space-y-4">
                        <Label htmlFor="googleUrl" className="text-[10px] font-black uppercase tracking-widest text-[#6d7175] flex items-center gap-2">
                           <FileCode className="h-4 w-4 text-[#008060]" />
                           Google Deployment URL
                        </Label>
                        <Input
                          id="googleUrl"
                          placeholder="https://script.google.com/macros/s/.../exec"
                          value={googleScriptUrl}
                          onChange={(e) => setGoogleScriptUrl(e.target.value)}
                          className="h-12 rounded-lg text-sm border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] font-mono shadow-inner"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-6 rounded-lg bg-[#f9fafb] border border-[#e1e3e5] border-dashed">
                        <div className="space-y-1">
                          <Label className="text-xs font-black uppercase tracking-widest text-[#202223]">Flow Status</Label>
                          <p className="text-[11px] text-[#6d7175] font-medium">
                            Turn this off to stop sending data to your sheet.
                          </p>
                        </div>
                        <Switch
                          checked={isActive}
                          onCheckedChange={setIsActive}
                          className="scale-95 data-[state=checked]:bg-[#008060]"
                        />
                      </div>

                      <Button type="submit" disabled={isPending} size="lg" className="w-full bg-[#008060] hover:bg-[#006e52] text-white rounded-lg h-12 px-10 gap-2 shadow-sm font-black text-xs uppercase tracking-widest transition-all">
                         <Save className="h-4 w-4" />
                         {isPending ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardContent>
                  </Card>
               </form>
            </section>
          </div>

          {/* Sidebar: Documentation */}
          <div className="lg:col-span-5 space-y-8">
            <div className="sticky top-28 space-y-8">
               <Card className="rounded-lg border-[#e1e3e5] shadow-xs overflow-hidden bg-white">
                  <CardHeader className="bg-[#fafafa] pb-4 pt-5 border-b border-[#e1e3e5] px-8">
                     <CardTitle className="text-[10px] font-black flex items-center gap-3 uppercase tracking-[0.2em] text-[#6d7175]">
                        <LinkIcon className="h-4 w-4" />
                        How to set up your Google Sheet
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-8 space-y-8">
                      <ol className="space-y-5">
                         {[
                           { step: "Spreadsheet", desc: "Open the Google Sheet where you want your data to go." },
                           { step: "Apps Script", desc: 'Go to <span className="text-[#008060] font-bold">Extensions > Apps Script</span>.' },
                           { step: "Code", desc: 'Delete everything there and paste the code from below.' },
                           { step: "Deployment", desc: 'Click <span className="text-[#008060] font-bold">Deploy > New Deployment</span>.' },
                           { step: "Settings", desc: 'Choose <span className="text-[#008060] font-bold">Web App</span> and set "Who has access" to <span className="text-[#d72c0d] font-black uppercase tracking-tighter">Anyone</span>.' },
                           { step: "Finalize", desc: 'Copy the "Web App URL" and paste it into <span className="font-bold text-[#202223]">Section 2</span> above.' }
                         ].map((item, i) => (
                           <li key={i} className="flex gap-5">
                              <span className="flex-none h-6 w-6 rounded bg-[#f1f2f3] border border-[#e1e3e5] text-[#6d7175] text-[10px] font-black flex items-center justify-center">
                                 {i+1}
                              </span>
                              <div className="space-y-1">
                                 <p className="font-black text-[10px] uppercase tracking-widest text-[#202223]">{item.step}</p>
                                 <p className="text-[11px] text-[#6d7175] font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                              </div>
                           </li>
                         ))}
                      </ol>

                      <div className="pt-6 space-y-4">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-[#6d7175] flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            Copy this code to Google Sheets
                         </Label>
                         <div className="rounded-lg bg-[#0b0c0d] p-5 font-mono text-[11px] leading-relaxed text-[#aeb4b9] overflow-hidden relative border border-[#1a1c1d] shadow-inner group">
                            <pre className="max-h-[300px] overflow-auto custom-scrollbar pt-2"><code>{GOOGLE_SCRIPT_TEMPLATE}</code></pre>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Button size="icon" variant="secondary" className="rounded-md h-8 w-8 shadow-md border-[#333] bg-[#1a1c1d] hover:bg-[#2a2c2d] text-white" onClick={() => copyToClipboard(GOOGLE_SCRIPT_TEMPLATE, setCopiedScript)}>
                                  {copiedScript ? <Check className="h-3.5 w-3.5 text-[#008060]" /> : <Copy className="h-3.5 w-3.5" />}
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
