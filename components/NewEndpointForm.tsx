"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, ArrowLeft, Info, HelpCircle, Sparkles, Database, Layers, Layout, Zap, X } from "lucide-react";
import Link from "next/link";
import { createEndpointAction } from "@/app/actions/endpoint";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Field = {
  name: string;
  type: "string" | "number" | "boolean";
  required: boolean;
};

export function NewEndpointForm() {
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([
    { name: "customer_name", type: "string", required: true },
    { name: "order_total", type: "number", required: true },
  ]);
  const [isPending, setIsPending] = useState(false);

  const addField = () => {
    setFields([...fields, { name: "", type: "string", required: true }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, updates: Partial<Field>) => {
    setFields(
      fields.map((field, i) => (i === index ? { ...field, ...updates } : field))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return toast.error("Please provide a name for this flow");
    if (fields.length === 0) return toast.error("Please add at least one field to collect");
    
    // Sanitize field names: no spaces, only alphanumeric and underscores
    if (fields.some((f) => !f.name)) return toast.error("All pieces of data must have a name");
    if (fields.some((f) => !/^[a-zA-Z0-9_]+$/.test(f.name))) {
      return toast.error("Field names can only contain letters, numbers, and underscores (no spaces)");
    }

    setIsPending(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("fields", JSON.stringify(fields));

    try {
      await createEndpointAction(formData);
      toast.success("Flow created! Now let's connect it.");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      setIsPending(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-[calc(100vh-56px)] pb-24 dot-grid relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#fafafa] pointer-events-none z-0" />
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div className="flex items-center gap-3.5">
             <Link href="/dashboard">
                <Button variant="outline" size="icon" type="button" className="rounded-lg h-9 w-9 border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm cursor-pointer">
                  <ArrowLeft className="h-4 w-4 text-zinc-650" />
                </Button>
             </Link>
             <div className="space-y-0.5">
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 font-sans">Create Pipeline</h1>
                <p className="text-zinc-400 text-xs font-normal">
                  Configure automated ingestion triggers.
                </p>
             </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Section 1: Identity */}
          <section className="space-y-4">
             <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-zinc-950 text-white flex items-center justify-center text-[10px] font-semibold">1</div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Pipeline Details</h3>
              </div>
             <Card className="rounded-xl border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.015)] overflow-hidden bg-white">
                 <CardContent className="p-6">
                    <div className="space-y-2">
                       <Label htmlFor="name" className="text-[10px] font-semibold uppercase tracking-wider text-zinc-450 flex items-center gap-1.5">
                           <Layout className="h-3.5 w-3.5 opacity-70" />
                           Pipeline Name
                       </Label>
                       <Input
                         id="name"
                         placeholder="e.g. Shopify Orders to Google Sheets"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         required
                         className="h-10 rounded-lg text-xs border-zinc-200 focus-visible:ring-zinc-950 focus:border-zinc-950 transition-all bg-zinc-50 shadow-none text-zinc-800"
                       />
                       <p className="text-[10px] text-zinc-400 font-normal">
                          This label is used exclusively for internal classification inside your console dashboard.
                       </p>
                    </div>
                 </CardContent>
             </Card>
          </section>

          {/* Section 2: Data Schema */}
          <section className="space-y-4">
             <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-zinc-950 text-white flex items-center justify-center text-[10px] font-semibold">2</div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Data Schema Definition</h3>
              </div>
             <Card className="rounded-xl border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.015)] overflow-hidden bg-white">
                <CardHeader className="bg-zinc-50/50 pb-3 pt-3 border-b border-zinc-200/60 px-6 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-zinc-450" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Expected JSON payload structure</span>
                   </div>
                  <Button variant="outline" size="sm" onClick={addField} type="button" className="rounded-md h-7 px-3 gap-1 border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all font-semibold text-[10px] tracking-tight cursor-pointer shadow-sm">
                      <Plus className="h-3.5 w-3.5" />
                      Add Parameter
                   </Button>
                </CardHeader>

                <CardContent className="p-0">
                   <div className="divide-y divide-zinc-100">
                     {fields.map((field, index) => (
                       <div key={index} className="p-6 hover:bg-zinc-50/20 transition-all group">
                         <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                           <div className="grid gap-1.5 flex-1 w-full">
                             <Label className="font-semibold text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                                <Database className="h-3 w-3 opacity-60" />
                                Parameter Identifier
                             </Label>
                             <Input
                               placeholder="e.g. customer_id"
                               value={field.name}
                               onChange={(e) => updateField(index, { name: e.target.value })}
                               className="rounded-lg h-9 bg-white border-zinc-200 font-mono text-xs focus-visible:ring-zinc-950 focus:border-zinc-950 transition-all shadow-none text-zinc-800"
                             />
                           </div>

                           <div className="grid gap-1.5 w-full md:w-44">
                             <Label className="font-semibold text-[10px] uppercase tracking-wider text-zinc-400">Payload Type</Label>
                             <Select
                               value={field.type}
                               onValueChange={(val: any) => updateField(index, { type: val })}
                             >
                               <SelectTrigger className="rounded-lg h-9 bg-white border-zinc-200 text-xs font-normal text-zinc-800 shadow-none cursor-pointer">
                                 <SelectValue />
                               </SelectTrigger>
                               <SelectContent className="rounded-lg border-zinc-200 shadow-md">
                                 <SelectItem value="string" className="text-xs font-normal cursor-pointer">Text (String)</SelectItem>
                                 <SelectItem value="number" className="text-xs font-normal cursor-pointer">Decimal (Number)</SelectItem>
                                 <SelectItem value="boolean" className="text-xs font-normal cursor-pointer">Toggle (Boolean)</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>

                           <div className="flex items-center justify-between md:flex-col md:items-center gap-1.5 bg-zinc-50 px-4 py-2 rounded-lg border border-zinc-200/80 w-full md:w-auto min-h-[36px] shadow-none">
                             <Label className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400 leading-none">Req?</Label>
                             <Switch
                               checked={field.required}
                               onCheckedChange={(val) => updateField(index, { required: val })}
                               className="scale-75 data-[state=checked]:bg-zinc-950 cursor-pointer"
                             />
                           </div>

                           <Button
                             variant="outline"
                             size="icon"
                             className="rounded-lg h-9 w-9 text-zinc-400 border-zinc-200 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-none cursor-pointer"
                             onClick={() => removeField(index)}
                             type="button"
                           >
                             <X className="h-4 w-4" />
                           </Button>
                         </div>
                       </div>
                     ))}
                   </div>

                   <div className="p-5 bg-zinc-50/50 flex justify-center border-t border-zinc-100">
                      <Button variant="ghost" size="sm" onClick={addField} type="button" className="rounded-md h-9 px-6 gap-2 font-semibold text-xs tracking-tight text-zinc-500 hover:bg-white hover:text-zinc-900 border border-transparent hover:border-zinc-200 transition-all cursor-pointer">
                        <Plus className="h-3.5 w-3.5 text-zinc-400" />
                        Insert Parameter Row
                      </Button>
                   </div>
                </CardContent>
             </Card>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3.5 items-center pt-6 border-t border-zinc-200/80">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="ghost" className="rounded-lg h-10 px-6 text-xs font-medium text-zinc-500 hover:text-zinc-900 w-full cursor-pointer" type="button">Discard</Button>
          </Link>
          <Button size="lg" className="bg-zinc-950 hover:bg-zinc-850 text-white rounded-lg h-10 px-8 text-xs font-medium tracking-tight gap-2 shadow-sm transition-all w-full sm:w-auto cursor-pointer" type="submit" disabled={isPending}>
            {isPending ? <Sparkles className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            {isPending ? "Deploying..." : "Create Pipeline"}
          </Button>
        </div>
      </form>
    </div>
  );
}
