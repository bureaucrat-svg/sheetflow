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
    <div className="min-h-[calc(100vh-56px)] pb-20 bg-transparent relative">
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8 relative z-10">
        
        {/* Modern Swiss Style Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <div className="space-y-0.5">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">Flows</h1>
            <p className="text-zinc-400 text-xs font-normal">
              Manage secure automation flows converting API payloads into sheets.
            </p>
          </div>
          <div className="flex items-center gap-2">
             <Link href="/dashboard/new">
                <Button className="bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg h-9 px-4 gap-1.5 shadow-sm font-medium text-xs tracking-tight transition-all cursor-pointer">
                  <Plus className="h-4 w-4" />
                  New Flow
                </Button>
             </Link>
          </div>
        </div>

        {endpoints.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 text-center border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="h-12 w-12 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl flex items-center justify-center mb-5 text-zinc-400 relative z-10">
               <Database className="h-5 w-5" />
            </div>
            <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight relative z-10">Create your first spreadsheet flow</CardTitle>
            <CardDescription className="mt-1.5 text-xs max-w-xs px-4 text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed relative z-10">
              Build a secure endpoint to validate raw JSON payloads and append rows directly to Google Sheets.
            </CardDescription>
            <Link href="/dashboard/new" className="mt-6 relative z-10">
              <Button size="lg" className="bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg h-9 px-5 gap-1.5 font-medium text-xs tracking-tight shadow-sm cursor-pointer">
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
               <span className="text-[10px] font-medium px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 rounded-md">
                  {endpoints.length} Total
               </span>
            </div>
            
            <Card className="border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200/60 dark:border-zinc-800/60">
                    <TableRow className="hover:bg-transparent border-0">
                      <TableHead className="py-3 pl-5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Flow Details</TableHead>
                      <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Status</TableHead>
                      <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Columns Mapping</TableHead>
                      <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Created</TableHead>
                      <TableHead className="py-3 text-right pr-5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Configuration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endpoints.map((endpoint: Endpoint) => (
                      <TableRow key={endpoint.id} className="group hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30 transition-all border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                        <TableCell className="py-4 pl-5">
                          <div className="flex items-center gap-3.5">
                             <div className="h-8 w-8 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/65 dark:border-zinc-800/65 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:bg-zinc-950 dark:group-hover:bg-zinc-50 group-hover:text-white dark:group-hover:text-zinc-950 group-hover:border-zinc-950 dark:group-hover:border-zinc-200 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                                <Globe className="h-4 w-4" />
                             </div>
                             <div className="flex flex-col gap-0.5">
                               <span className="font-semibold text-xs tracking-tight text-zinc-800 dark:text-zinc-100">{endpoint.name}</span>
                               <span className="text-[10px] font-mono text-zinc-400">ID: {endpoint.id.slice(0, 8)}</span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          {endpoint.isActive ? (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium tracking-tight">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-medium tracking-tight">
                              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                              Paused
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                             <div className="flex -space-x-1.5">
                               {(endpoint.schema as any[]).slice(0, 3).map((field, i) => (
                                 <div key={i} className="h-6 w-6 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-[9px] font-mono text-zinc-500 dark:text-zinc-400 shadow-xs ring-2 ring-white dark:ring-zinc-900" title={field.name}>
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
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-sans">
                             <Clock className="h-3.5 w-3.5 opacity-60 text-zinc-400" />
                             {new Date(endpoint.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4 pr-5">
                          <Link href={`/dashboard/endpoint/${endpoint.id}`}>
                            <Button variant="outline" size="sm" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg h-8 gap-1.5 px-3.5 font-medium text-xs transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm cursor-pointer">
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
