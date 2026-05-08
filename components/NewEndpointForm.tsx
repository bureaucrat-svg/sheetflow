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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-32 px-4">
      {/* Header Section - More Compact */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-background p-6 rounded-lg border shadow-sm">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" type="button" className="rounded-lg h-10 w-10 border hover:bg-muted/50 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold tracking-widest text-[10px] uppercase">
             <Sparkles className="h-3.5 w-3.5" />
             <span>New Pipeline</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Create Flow</h1>
          <p className="text-muted-foreground text-sm">
            Configure your data structure and sheet connection.
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Step 1: Identity */}
        <Card className="rounded-lg border shadow-sm overflow-hidden bg-background">
          <CardHeader className="bg-muted/30 pb-4 pt-4 px-6 border-b">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
                  <Layout className="h-4 w-4" />
               </div>
               <CardTitle className="text-lg font-bold">1. Flow Identity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-1 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold">Flow Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Stripe New Customers"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 rounded-lg text-base border focus:border-primary transition-all bg-muted/5"
                  />
                  <p className="text-[11px] text-muted-foreground italic">
                     A descriptive name for your dashboard tracking.
                  </p>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Schema */}
        <Card className="rounded-lg border shadow-sm overflow-hidden bg-background">
          <CardHeader className="bg-muted/30 pb-4 pt-4 px-6 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                  <Layers className="h-4 w-4" />
               </div>
               <CardTitle className="text-lg font-bold">2. Data Architecture</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={addField} type="button" className="rounded-lg h-9 px-4 gap-2 border text-emerald-700 hover:bg-emerald-50 transition-all font-bold text-xs">
                <Plus className="h-3.5 w-3.5" />
                Add Field
             </Button>
          </CardHeader>

          <CardContent className="p-0">
             {/* Fields List */}
             <div className="divide-y divide-muted">
               {fields.map((field, index) => (
                 <div key={index} className="group relative p-6 hover:bg-muted/5 transition-colors">
                   <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4">
                     <div className="grid gap-2 flex-1 w-full">
                       <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Database className="h-3 w-3" />
                          JSON Key Name
                       </Label>
                       <Input
                         placeholder="e.g. user_email"
                         value={field.name}
                         onChange={(e) => updateField(index, { name: e.target.value })}
                         className="rounded-lg h-11 bg-background border font-mono text-sm focus:ring-primary/20 transition-all"
                       />
                     </div>

                     <div className="grid gap-2 w-full lg:w-48">
                       <Label className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Type</Label>
                       <Select
                         value={field.type}
                         onValueChange={(val: any) => updateField(index, { type: val })}
                       >
                         <SelectTrigger className="rounded-lg h-11 bg-background border text-sm">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent className="rounded-lg border">
                           <SelectItem value="string" className="rounded-md">Text</SelectItem>
                           <SelectItem value="number" className="rounded-md">Number</SelectItem>
                           <SelectItem value="boolean" className="rounded-md">Boolean</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="flex items-center justify-between lg:flex-col lg:items-center gap-2 bg-muted/20 px-4 py-2 rounded-lg border w-full lg:w-auto min-h-[44px]">
                       <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Req?</Label>
                       <Switch
                         checked={field.required}
                         onCheckedChange={(val) => updateField(index, { required: val })}
                         className="scale-90 data-[state=checked]:bg-emerald-600"
                       />
                     </div>

                     <Button
                       variant="ghost"
                       size="icon"
                       className="rounded-lg h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                       onClick={() => removeField(index)}
                       type="button"
                     >
                       <Trash2 className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>
               ))}
             </div>

             {/* Footer Action */}
             <div className="p-6 bg-muted/10 flex justify-center border-t">
                <Button variant="ghost" size="sm" onClick={addField} type="button" className="rounded-lg h-10 px-6 gap-2 font-bold hover:bg-background transition-all group border border-transparent hover:border-border">
                  <Plus className="h-4 w-4 text-emerald-600" />
                  Insert Another Field
                </Button>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 items-center pt-6 border-t">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button variant="ghost" className="rounded-lg h-12 px-8 text-sm font-bold w-full" type="button">Discard</Button>
        </Link>
        <Button size="lg" className="rounded-lg h-12 px-12 text-base gap-3 shadow-lg hover:shadow-primary/20 transition-all font-black w-full sm:w-auto group overflow-hidden relative" type="submit" disabled={isPending}>
          <div className="absolute inset-0 bg-linear-to-r from-primary to-emerald-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10"></div>
          {isPending ? <Sparkles className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />}
          {isPending ? "Building..." : "Create Flow"}
        </Button>
      </div>
    </form>
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
