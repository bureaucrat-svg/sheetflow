import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, XCircle, MoreVertical, LayoutGrid, Zap, ArrowRight, Activity, Globe, Database, Clock } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

type Endpoint = Awaited<ReturnType<typeof prisma.endpoint.findMany>>[number];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  
  const endpoints = await prisma.endpoint.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-[#fafafa] min-h-[calc(100vh-56px)] pb-20 dot-grid relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#fafafa] pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8 relative z-10">
        
        {/* Modern Swiss Style Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
          <div className="space-y-0.5">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 font-sans">Pipelines</h1>
            <p className="text-zinc-400 text-xs font-normal">
              Manage secure automation flows converting API payloads into sheets.
            </p>
          </div>
          <div className="flex items-center gap-2">
             <Link href="/dashboard/new">
                <Button className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg h-9 px-4 gap-1.5 shadow-sm font-medium text-xs tracking-tight transition-all cursor-pointer">
                  <Plus className="h-4 w-4" />
                  New Pipeline
                </Button>
             </Link>
          </div>
        </div>

        {endpoints.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 text-center border-zinc-200/80 rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01)] relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="h-12 w-12 bg-zinc-50 border border-zinc-200/60 rounded-xl flex items-center justify-center mb-5 text-zinc-400 relative z-10">
               <Database className="h-5 w-5" />
            </div>
            <CardTitle className="text-sm font-semibold text-zinc-900 tracking-tight relative z-10">Deploy your first pipeline</CardTitle>
            <CardDescription className="mt-1.5 text-xs max-w-xs px-4 text-zinc-450 font-normal leading-relaxed relative z-10">
              Build a secure endpoint to validate raw JSON payloads and append rows directly to Google Sheets.
            </CardDescription>
            <Link href="/dashboard/new" className="mt-6 relative z-10">
              <Button size="lg" className="bg-zinc-950 hover:bg-zinc-850 text-white rounded-lg h-9 px-5 gap-1.5 font-medium text-xs tracking-tight shadow-sm cursor-pointer">
                <Plus className="h-4 w-4" />
                Build Endpoint
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-0.5">
               <h2 className="font-semibold text-xs tracking-tight text-zinc-500 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-zinc-400" />
                  Active Automations
               </h2>
               <span className="text-[10px] font-medium px-2 py-0.5 border border-zinc-200 text-zinc-500 bg-zinc-50 rounded-md">
                  {endpoints.length} Total
               </span>
            </div>
            
            <Card className="border-zinc-200/80 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.015)] overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-50/50 border-b border-zinc-200/60">
                    <TableRow className="hover:bg-transparent border-0">
                      <TableHead className="py-3 pl-5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Pipeline Details</TableHead>
                      <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Status</TableHead>
                      <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Columns Mapping</TableHead>
                      <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Created</TableHead>
                      <TableHead className="py-3 text-right pr-5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Configuration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endpoints.map((endpoint: Endpoint) => (
                      <TableRow key={endpoint.id} className="group hover:bg-zinc-50/30 transition-all border-b border-zinc-100 last:border-0">
                        <TableCell className="py-4 pl-5">
                          <div className="flex items-center gap-3.5">
                             <div className="h-8 w-8 rounded-lg bg-zinc-50 border border-zinc-200/65 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                                <Globe className="h-4 w-4" />
                             </div>
                             <div className="flex flex-col gap-0.5">
                               <span className="font-semibold text-xs tracking-tight text-zinc-800">{endpoint.name}</span>
                               <span className="text-[10px] font-mono text-zinc-400">ID: {endpoint.id.slice(0, 8)}</span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          {endpoint.isActive ? (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-medium tracking-tight">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-500 text-[10px] font-medium tracking-tight">
                              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                              Paused
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                             <div className="flex -space-x-1.5">
                               {(endpoint.schema as any[]).slice(0, 3).map((field, i) => (
                                 <div key={i} className="h-6 w-6 rounded-md border border-zinc-200 bg-white flex items-center justify-center text-[9px] font-mono text-zinc-500 shadow-xs ring-2 ring-white" title={field.name}>
                                   {field.name[0].toLowerCase()}
                                 </div>
                               ))}
                             </div>
                             {(endpoint.schema as any[]).length > 3 && (
                                <span className="text-[10px] font-mono text-zinc-400">+{(endpoint.schema as any[]).length - 3}</span>
                             )}
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-500 text-xs font-normal py-4">
                          <div className="flex items-center gap-1.5 text-zinc-450 font-sans">
                             <Clock className="h-3.5 w-3.5 opacity-60 text-zinc-400" />
                             {new Date(endpoint.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4 pr-5">
                          <Link href={`/dashboard/endpoint/${endpoint.id}`}>
                            <Button variant="outline" size="sm" className="bg-white border-zinc-200 text-zinc-700 rounded-lg h-8 gap-1.5 px-3.5 font-medium text-xs transition-all hover:bg-zinc-50 hover:border-zinc-300 shadow-sm cursor-pointer">
                              Manage Flow
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
