"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, ArrowLeft, Info, HelpCircle, Sparkles, Database, Layers, Layout, Zap } from "lucide-react";
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
    <div className="bg-[#f6f6f7] min-h-[calc(100vh-64px)] pb-32">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#e1e3e5] pb-8">
          <div className="flex items-center gap-5">
             <Link href="/dashboard">
                <Button variant="outline" size="icon" type="button" className="rounded-lg h-10 w-10 border-[#e1e3e5] bg-white hover:bg-[#f6f6f7] transition-all shadow-xs">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
             </Link>
             <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter text-[#202223] uppercase italic">Create Flow</h1>
                <p className="text-[#6d7175] text-sm font-medium">
                  Set up your automated data flow.
                </p>
             </div>
          </div>
        </div>

        <div className="grid gap-10">
          {/* Section 1: Identity */}
          <section className="space-y-5">
             <div className="flex items-center gap-3">
                 <div className="h-6 w-6 rounded bg-[#202223] text-white flex items-center justify-center text-[10px] font-black shadow-sm">1</div>
                 <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[#6d7175]">Name Your Flow</h3>
              </div>
             <Card className="rounded-lg border-[#e1e3e5] shadow-xs overflow-hidden bg-white">
                <CardContent className="p-8">
                   <div className="space-y-4">
                      <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-[#6d7175] flex items-center gap-2">
                          <Layout className="h-4 w-4 text-[#008060]" />
                          Flow Name
                       </Label>
                      <Input
                        id="name"
                        placeholder="e.g. Shopify Orders to Google Sheets"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 rounded-lg text-sm border-[#e1e3e5] focus:border-[#008060] transition-all bg-[#f9fafb] shadow-inner"
                      />
                      <p className="text-[11px] text-[#6d7175] font-medium opacity-60">
                         This name is only used for internal tracking in your dashboard.
                      </p>
                   </div>
                </CardContent>
             </Card>
          </section>

          {/* Section 2: Data Schema */}
          <section className="space-y-5">
             <div className="flex items-center gap-3">
                 <div className="h-6 w-6 rounded bg-[#202223] text-white flex items-center justify-center text-[10px] font-black shadow-sm">2</div>
                 <h3 className="text-xs font-black uppercase tracking-[0.15em] text-[#6d7175]">Data Columns</h3>
              </div>
             <Card className="rounded-lg border-[#e1e3e5] shadow-xs overflow-hidden bg-white">
                <CardHeader className="bg-[#fafafa] pb-4 pt-4 border-b border-[#e1e3e5] px-8 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-3">
                      <Layers className="h-4 w-4 text-[#008060]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6d7175]">What data should we collect?</span>
                   </div>
                  <Button variant="outline" size="sm" onClick={addField} type="button" className="rounded-lg h-8 px-4 gap-2 border-[#e1e3e5] bg-white text-[#008060] hover:bg-[#e3f1df] hover:border-[#bbe5b3] transition-all font-black text-[9px] uppercase tracking-widest">
                      <Plus className="h-3.5 w-3.5" />
                      Add Property
                   </Button>
                </CardHeader>

                <CardContent className="p-0">
                   <div className="divide-y divide-[#f1f2f3]">
                     {fields.map((field, index) => (
                       <div key={index} className="p-8 hover:bg-[#f9fafb] transition-colors group">
                         <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                           <div className="grid gap-3 flex-1 w-full">
                             <Label className="font-black text-[9px] uppercase tracking-widest text-[#6d7175] flex items-center gap-1.5">
                                <Database className="h-3 w-3 opacity-60" />
                                Column Name
                             </Label>
                             <Input
                               placeholder="e.g. customer_id"
                               value={field.name}
                               onChange={(e) => updateField(index, { name: e.target.value })}
                               className="rounded-lg h-11 bg-white border-[#e1e3e5] font-mono text-xs focus:ring-[#008060]/20 transition-all shadow-xs"
                             />
                           </div>

                           <div className="grid gap-3 w-full lg:w-48">
                             <Label className="font-black text-[9px] uppercase tracking-widest text-[#6d7175]">Data Type</Label>
                             <Select
                               value={field.type}
                               onValueChange={(val: any) => updateField(index, { type: val })}
                             >
                               <SelectTrigger className="rounded-lg h-11 bg-white border-[#e1e3e5] text-xs font-bold text-[#202223] shadow-xs">
                                 <SelectValue />
                               </SelectTrigger>
                               <SelectContent className="rounded-lg border-[#e1e3e5] shadow-lg">
                                 <SelectItem value="string" className="text-xs font-bold">Text (String)</SelectItem>
                                 <SelectItem value="number" className="text-xs font-bold">Decimal (Number)</SelectItem>
                                 <SelectItem value="boolean" className="text-xs font-bold">Toggle (Boolean)</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>

                           <div className="flex items-center justify-between lg:flex-col lg:items-center gap-2 bg-[#f1f2f3] px-5 py-2.5 rounded-lg border border-[#e1e3e5] w-full lg:w-auto min-h-[48px] shadow-inner">
                             <Label className="text-[9px] font-black uppercase tracking-widest text-[#6d7175]">Req?</Label>
                             <Switch
                               checked={field.required}
                               onCheckedChange={(val) => updateField(index, { required: val })}
                               className="scale-90 data-[state=checked]:bg-[#008060]"
                             />
                           </div>

                           <Button
                             variant="outline"
                             size="icon"
                             className="rounded-lg h-11 w-11 text-[#6d7175] border-[#e1e3e5] hover:text-[#d72c0d] hover:bg-[#fff4f2] hover:border-[#f8d7da] transition-all shadow-xs"
                             onClick={() => removeField(index)}
                             type="button"
                           >
                             <Trash2 className="h-4 w-4" />
                           </Button>
                         </div>
                       </div>
                     ))}
                   </div>

                   <div className="p-8 bg-[#fafafa] flex justify-center border-t border-[#e1e3e5]">
                      <Button variant="ghost" size="sm" onClick={addField} type="button" className="rounded-lg h-11 px-8 gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:border-[#e1e3e5] transition-all border border-transparent">
                        <Plus className="h-4 w-4 text-[#008060]" />
                        Insert Another Property
                      </Button>
                   </div>
                </CardContent>
             </Card>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-5 items-center pt-10 border-t border-[#e1e3e5]">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="ghost" className="rounded-lg h-12 px-8 text-xs font-black uppercase tracking-widest text-[#6d7175] hover:text-[#202223] w-full" type="button">Discard</Button>
          </Link>
          <Button size="lg" className="bg-[#008060] hover:bg-[#006e52] text-white rounded-lg h-12 px-12 text-xs font-black uppercase tracking-widest gap-3 shadow-sm transition-all w-full sm:w-auto" type="submit" disabled={isPending}>
            {isPending ? <Sparkles className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isPending ? "Configuring..." : "Create Flow"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Helper component for badges
function Badge({ variant, className, children }: { variant: "outline" | "secondary", className?: string, children: React.ReactNode }) {
  const variants = {
    outline: "border border-input bg-background",
    secondary: "border-transparent bg-secondary text-secondary-foreground"
  };
  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)}>
      {children}
    </div>
  );
}
