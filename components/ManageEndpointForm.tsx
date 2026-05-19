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
    nextjs: `// Node.js implementation example
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

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleConfirmDelete = async () => {
    setShowDeleteDialog(false);
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
    <div className="min-h-[calc(100vh-56px)] pb-24 bg-transparent relative">
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <div className="flex items-center gap-3.5">
             <Link href="/dashboard">
                <Button variant="outline" size="icon" className="rounded-lg h-9 w-9 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm cursor-pointer">
                  <ArrowLeft className="h-4 w-4 text-zinc-600 dark:text-zinc-350" />
                </Button>
             </Link>
             <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">{endpoint.name}</h1>
                <div className="flex items-center gap-2">
                   <div className={cn(
                      "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-tight border shadow-[0_1px_1px_rgba(0,0,0,0.01)]",
                      isActive ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400" : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400"
                   )}>
                      <span className={cn("h-1 w-1 rounded-full", isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-400")}></span>
                      {isActive ? "Running" : "Paused"}
                   </div>
                   <span className="text-[10px] font-mono text-zinc-400">ID: {endpoint.id}</span>
                </div>
             </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg h-9 px-3.5 gap-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-900 transition-all font-medium text-xs shadow-sm cursor-pointer" onClick={() => setShowDeleteDialog(true)} disabled={isPending}>
             <Trash2 className="h-3.5 w-3.5" />
             Delete Flow
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            
            {/* Section 1: Inbound Webhook */}
            <section className="space-y-4">
               <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center text-[10px] font-semibold">1</div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Inbound Payload Endpoint</h3>
               </div>
               <Card className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
                  <CardContent className="p-6 space-y-6">
                     <div className="space-y-3">
                        <p className="text-xs text-zinc-500 font-normal leading-relaxed">
                           Send raw JSON payloads to this unique webhook endpoint. Data parameters will be structured, validated, and appended to your spreadsheet.
                        </p>
                        <div className="flex gap-2 bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 border-dashed focus-within:border-zinc-900 dark:focus-within:border-zinc-100 transition-all shadow-none">
                           <Input value={captureUrl} readOnly className="border-none bg-transparent font-mono text-[11px] focus-visible:ring-0 shadow-none h-8 text-zinc-800 dark:text-zinc-200" />
                           <Button size="sm" className="bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-md h-8 px-3.5 gap-1.5 font-medium text-xs shadow-sm transition-all cursor-pointer" onClick={() => copyToClipboard(captureUrl, setCopiedUrl)}>
                             {copiedUrl ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                             {copiedUrl ? "Copied" : "Copy URL"}
                           </Button>
                        </div>
                     </div>

                     {/* Implementation Tabs */}
                     <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                           <Label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                              <Code className="h-3.5 w-3.5 opacity-70" />
                              SDK Implementation
                           </Label>
                           <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
                              {(["curl", "python", "nextjs"] as const).map((tab) => (
                                 <button
                                   key={tab}
                                   onClick={() => setActiveTab(tab)}
                                   className={cn(
                                     "px-3 py-1 text-[10px] font-medium rounded-md transition-all cursor-pointer",
                                     activeTab === tab ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-950 dark:text-zinc-50 font-semibold" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200"
                                   )}
                                 >
                                   {tab === "nextjs" ? "Next.js" : tab}
                                 </button>
                              ))}
                           </div>
                        </div>
                        <div className="rounded-xl bg-zinc-950 p-5 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-hidden relative border border-zinc-800 shadow-inner group">
                           <pre className="max-h-[200px] overflow-auto custom-scrollbar pt-2"><code>{usageExamples[activeTab]}</code></pre>
                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="icon" variant="secondary" className="rounded-md h-8 w-8 shadow-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer" onClick={() => copyToClipboard(usageExamples[activeTab], setCopiedExample)}>
                                 {copiedExample ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                              </Button>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </section>

            {/* Section 2: Destination */}
            <section className="space-y-4">
               <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center text-[10px] font-semibold">2</div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Google Sheets Routing</h3>
               </div>
               <form onSubmit={handleUpdate}>
                  <Card className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="googleUrl" className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                           <FileCode className="h-3.5 w-3.5 opacity-70" />
                           Google Apps Script Execution WebApp URL
                        </Label>
                        <Input
                          id="googleUrl"
                          placeholder="https://script.google.com/macros/s/.../exec"
                          value={googleScriptUrl}
                          onChange={(e) => setGoogleScriptUrl(e.target.value)}
                          className="h-10 rounded-lg text-xs border border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-50 focus:border-zinc-950 dark:focus:border-zinc-50 transition-all bg-zinc-50 dark:bg-zinc-950 font-mono shadow-none text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 border-dashed">
                        <div className="space-y-0.5">
                          <Label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Flow Routing Status</Label>
                          <p className="text-[10px] text-zinc-400 font-normal">
                            Pause streaming payloads without modifying client SDK request hooks.
                          </p>
                        </div>
                        <Switch
                          checked={isActive}
                          onCheckedChange={setIsActive}
                          className="scale-90 data-[state=checked]:bg-zinc-950 dark:data-[state=checked]:bg-zinc-50 cursor-pointer"
                        />
                      </div>

                      <Button type="submit" disabled={isPending} size="lg" className="w-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg h-10 px-8 gap-1.5 shadow-sm font-medium text-xs tracking-tight transition-all cursor-pointer">
                         <Save className="h-3.5 w-3.5" />
                         {isPending ? "Updating flow..." : "Save Route Configuration"}
                      </Button>
                    </CardContent>
                  </Card>
               </form>
            </section>
          </div>

          {/* Sidebar: Documentation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-20 space-y-6">
               <Card className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
                  <CardHeader className="bg-zinc-50/50 dark:bg-zinc-950/50 pb-3 pt-3 border-b border-zinc-200/60 dark:border-zinc-800/60 px-6">
                     <CardTitle className="text-[10px] font-semibold flex items-center gap-2 uppercase tracking-wider text-zinc-500">
                        <LinkIcon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                        Google Apps Script Connection Setup
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-6 space-y-6">
                      <ol className="space-y-4">
                         {[
                           { step: "Spreadsheet", desc: "Open the Google Sheet where you want your payload rows structured." },
                           { step: "Apps Script Editor", desc: 'Select <span className="text-zinc-950 font-semibold">Extensions > Apps Script</span> in the sheet menu.' },
                           { step: "Deploy Connection Code", desc: 'Wipe any default boilerplate code and paste the structural macro shown below.' },
                           { step: "Execute Deployment", desc: 'Click <span className="text-zinc-950 font-semibold">Deploy > New Deployment</span>.' },
                           { step: "Access Policy Settings", desc: 'Set Configuration to <span className="text-zinc-950 font-semibold">Web App</span> and configure "Who has access" to <span className="text-red-600 font-semibold uppercase tracking-tight">Anyone</span>.' },
                           { step: "Deploy URL Routing", desc: 'Authorize credentials, copy the created Web App URL, and paste it into <span className="font-semibold text-zinc-800">Section 2</span>.' }
                         ].map((item, i) => (
                           <li key={i} className="flex gap-4">
                              <span className="flex-none h-5 w-5 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-mono flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.01)]">
                                 {i+1}
                              </span>
                              <div className="space-y-0.5">
                                 <p className="font-semibold text-[10px] uppercase tracking-wider text-zinc-800 dark:text-zinc-200">{item.step}</p>
                                 <p className="text-[10px] text-zinc-500 font-normal leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                              </div>
                           </li>
                         ))}
                      </ol>

                      <div className="pt-4 space-y-2 border-t border-zinc-100 dark:border-zinc-800">
                         <Label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                            <Database className="h-3.5 w-3.5 opacity-70" />
                            Connection Script Code
                         </Label>
                         <div className="rounded-xl bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-300 overflow-hidden relative border border-zinc-800 shadow-inner group">
                            <pre className="max-h-[160px] overflow-auto custom-scrollbar pt-1"><code>{GOOGLE_SCRIPT_TEMPLATE}</code></pre>
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Button size="icon" variant="secondary" className="rounded-md h-7 w-7 shadow-md border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer" onClick={() => copyToClipboard(GOOGLE_SCRIPT_TEMPLATE, setCopiedScript)}>
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

      {/* Premium Frosted Glass Delete Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <Card className="max-w-sm w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
              <Trash2 className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Delete Flow Connection</CardTitle>
              <CardDescription className="text-xs text-zinc-400 dark:text-zinc-400 font-normal leading-relaxed">
                Are you sure you want to permanently delete <strong>{endpoint.name}</strong>? This action is irreversible and all incoming webhook pipelines to this endpoint will instantly stop.
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 rounded-lg h-9 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-300 cursor-pointer shadow-sm"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 rounded-lg h-9 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-sm transition-all"
                onClick={handleConfirmDelete}
                disabled={isPending}
              >
                Delete Flow
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// Local Badge helper
function Badge({ variant, children, className }: { variant: "success" | "secondary" | "destructive" | "outline", children: React.ReactNode, className?: string }) {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    secondary: "bg-zinc-50 text-zinc-700 border-zinc-200",
    destructive: "bg-red-50 text-red-700 border-red-200",
    outline: "bg-transparent text-zinc-700 border-zinc-200"
  };
  
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium border transition-all", variants[variant], className)}>
      {children}
    </span>
  );
}
