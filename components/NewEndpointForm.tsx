"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, ArrowLeft, Info, HelpCircle } from "lucide-react";
import Link from "next/link";
import { createEndpointAction } from "@/app/actions/endpoint";
import { toast } from "sonner";

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
    if (fields.some((f) => !f.name)) return toast.error("All pieces of data must have a name");

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
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-32">
      <div className="flex items-center gap-6 mt-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" type="button" className="rounded-lg h-12 w-12 border-2 hover:bg-muted/50">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">New Data Flow</h1>
          <p className="text-muted-foreground text-lg">First, tell us where this data is coming from and what it looks like.</p>
        </div>
      </div>

      <div className="grid gap-10">
        <Card className="rounded-lg border shadow-lg overflow-hidden bg-background">
          <CardHeader className="bg-primary/5 pb-6 pt-6 md:pb-10 md:pt-10">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 md:h-12 md:w-12 bg-primary rounded-lg flex items-center justify-center text-white shadow-md">
                  <Info className="h-5 w-5 md:h-6 md:w-6" />
               </div>
               <div>
                  <CardTitle className="text-xl md:text-2xl font-bold">What is this flow for?</CardTitle>
                  <CardDescription className="text-sm md:text-base mt-1">
                    Give it a name so you can recognize it later.
                  </CardDescription>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-10">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-lg font-bold">Flow Name</Label>
              <Input
                id="name"
                placeholder="e.g. Stripe New Customers, Website Contact Form"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-14 rounded-lg text-lg border-2 focus:border-primary transition-all"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border shadow-lg overflow-hidden bg-background">
          <CardHeader className="bg-emerald-500/5 pb-6 pt-6 md:pb-10 md:pt-10 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 md:h-12 md:w-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md">
                  <Plus className="h-5 w-5 md:h-6 md:w-6" />
               </div>
               <div>
                  <CardTitle className="text-xl md:text-2xl font-bold">Data to Collect</CardTitle>
                  <CardDescription className="text-sm md:text-base mt-1">
                    Add the specific pieces of information you want to save.
                  </CardDescription>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-10">
            <div className="space-y-8">
               <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg flex gap-4 text-blue-800 text-sm">
                  <HelpCircle className="h-6 w-6 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                     <p className="font-bold">What should I add here?</p>
                     <p className="leading-relaxed opacity-90">
                        Think about the information you currently copy-paste. If you want to save a customer's name, add a field called <b>name</b>. If you want their email, add <b>email</b>.
                     </p>
                  </div>
               </div>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 p-5 md:p-8 border-2 border-dashed rounded-lg bg-muted/10 group hover:border-emerald-500/30 transition-all">
                    <div className="grid gap-2 flex-1 w-full">
                      <Label className="font-bold text-sm ml-1 uppercase tracking-wider text-muted-foreground">Info Name</Label>
                      <Input
                        placeholder="e.g. full_name, price"
                        value={field.name}
                        onChange={(e) => updateField(index, { name: e.target.value })}
                        className="rounded-lg h-12 bg-background border-2"
                      />
                    </div>
                    <div className="grid gap-2 w-full md:w-48">
                      <Label className="font-bold text-sm ml-1 uppercase tracking-wider text-muted-foreground">Type of Info</Label>
                      <Select
                        value={field.type}
                        onValueChange={(val: any) => updateField(index, { type: val })}
                      >
                        <SelectTrigger className="rounded-lg h-12 bg-background border-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">Text (Words/Email)</SelectItem>
                          <SelectItem value="number">Number (Price/Count)</SelectItem>
                          <SelectItem value="boolean">Yes/No (True/False)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between md:flex-col md:items-center gap-4 bg-background px-5 py-2.5 rounded-lg border-2 w-full md:w-auto h-12">
                      <Label className="text-[10px] font-black uppercase tracking-widest md:mb-[-4px] text-muted-foreground">Required?</Label>
                      <Switch
                        checked={field.required}
                        onCheckedChange={(val) => updateField(index, { required: val })}
                        className="scale-90 data-[state=checked]:bg-emerald-500"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeField(index)}
                      type="button"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="lg" onClick={addField} type="button" className="w-full rounded-lg h-16 gap-3 border-2 border-dashed hover:bg-emerald-500/5 hover:border-emerald-500/50 hover:text-emerald-600 transition-all group">
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
                Add Another Piece of Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="rounded-lg h-16 px-10 text-lg" type="button">Cancel</Button>
        </Link>
        <Button size="lg" className="rounded-lg h-16 px-16 text-xl gap-3 shadow-2xl hover:shadow-primary/20 transition-all font-bold" type="submit" disabled={isPending}>
          <Save className="h-6 w-6" />
          {isPending ? "Creating..." : "Create My Flow"}
        </Button>
      </div>
    </form>
  );
}
