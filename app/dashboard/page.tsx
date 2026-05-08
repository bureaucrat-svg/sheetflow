import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Settings2, CheckCircle2, XCircle, MoreVertical, LayoutGrid, Zap, ArrowRight, Activity, Globe, Database, Clock } from "lucide-react";
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
    <div className="bg-[#f6f6f7] min-h-[calc(100vh-64px)] pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* Polaris Style Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 pb-8">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-black tracking-tighter text-[#202223] uppercase italic">Dashboard</h1>
            <p className="text-[#6d7175] text-sm font-medium">
              Manage your validated Google Sheet pipelines.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/dashboard/new">
                <Button className="bg-[#008060] hover:bg-[#006e52] text-white rounded-lg h-10 px-5 gap-2 shadow-sm font-black text-xs uppercase tracking-widest transition-all">
                  <Plus className="h-4 w-4" />
                  Create New Flow
                </Button>
             </Link>
          </div>
        </div>

        {endpoints.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-24 text-center border-[#e1e3e5] rounded-lg bg-white shadow-xs">
            <div className="h-16 w-16 bg-[#f1f2f3] rounded-2xl flex items-center justify-center mb-6">
               <Database className="h-8 w-8 text-[#6d7175]" />
            </div>
            <CardTitle className="text-xl font-black text-[#202223] uppercase italic tracking-tight">Ready to start?</CardTitle>
            <CardDescription className="mt-2 text-sm max-w-sm px-6 text-[#6d7175] font-medium leading-relaxed">
              Create your first automation to capture JSON data and push it directly into Google Sheets.
            </CardDescription>
            <Link href="/dashboard/new" className="mt-8">
              <Button size="lg" className="bg-[#008060] hover:bg-[#006e52] text-white rounded-lg h-11 px-8 gap-2 font-black text-xs uppercase tracking-widest">
                <Plus className="h-4 w-4" />
                Build First Flow
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
               <h2 className="font-black text-[10px] uppercase tracking-[0.2em] text-[#6d7175] flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-[#008060]" />
                  Active Pipelines
               </h2>
               <Badge variant="outline" className="bg-white border-[#e1e3e5] text-[#202223] text-[9px] font-black px-2.5 py-0.5 rounded-full">
                  {endpoints.length} Total
               </Badge>
            </div>
            
            <Card className="border-[#e1e3e5] rounded-lg shadow-xs overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-[#fafafa]">
                    <TableRow className="hover:bg-transparent border-b border-[#e1e3e5]">
                      <TableHead className="py-4 pl-6 text-[10px] font-black uppercase tracking-widest text-[#6d7175]">Pipeline Name</TableHead>
                      <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-[#6d7175]">Status</TableHead>
                      <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-[#6d7175]">Field Count</TableHead>
                      <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-[#6d7175]">Created</TableHead>
                      <TableHead className="py-4 text-right pr-6 text-[10px] font-black uppercase tracking-widest text-[#6d7175]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endpoints.map((endpoint: Endpoint) => (
                      <TableRow key={endpoint.id} className="group hover:bg-[#f9fafb] transition-colors border-b border-[#f1f2f3] last:border-0">
                        <TableCell className="py-5 pl-6">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-lg bg-[#f1f2f3] border border-[#e1e3e5] flex items-center justify-center text-[#6d7175] group-hover:bg-[#008060] group-hover:text-white group-hover:border-[#008060] transition-all shadow-xs">
                                <Globe className="h-5 w-5" />
                             </div>
                             <div className="flex flex-col gap-0.5">
                               <span className="font-bold text-sm tracking-tight text-[#202223]">{endpoint.name}</span>
                               <span className="text-[10px] font-mono text-[#6d7175] opacity-60">ID: {endpoint.id.split('-')[0]}...</span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5">
                          {endpoint.isActive ? (
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#e3f1df] border border-[#bbe5b3] text-[#008060] text-[9px] font-black uppercase tracking-tight">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#008060] animate-pulse"></span>
                              Active
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#f1f2f3] border border-[#e1e3e5] text-[#6d7175] text-[9px] font-black uppercase tracking-tight">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#6d7175]"></span>
                              Paused
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="py-5">
                          <div className="flex items-center gap-2.5">
                             <div className="flex -space-x-1.5">
                               {(endpoint.schema as any[]).slice(0, 3).map((_, i) => (
                                 <div key={i} className="h-7 w-7 rounded-md border border-[#e1e3e5] bg-white flex items-center justify-center text-[10px] font-black text-[#6d7175] shadow-xs ring-2 ring-white" title={(endpoint.schema as any[])[i].name}>
                                   {(endpoint.schema as any[])[i].name[0].toUpperCase()}
                                 </div>
                               ))}
                             </div>
                             {(endpoint.schema as any[]).length > 3 && (
                                <span className="text-[10px] font-bold text-[#6d7175]">+{(endpoint.schema as any[]).length - 3} more</span>
                             )}
                          </div>
                        </TableCell>
                        <TableCell className="text-[#6d7175] text-[11px] font-semibold py-5">
                          <div className="flex items-center gap-2">
                             <Clock className="h-3.5 w-3.5 opacity-40" />
                             {new Date(endpoint.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-5 pr-6">
                          <Link href={`/dashboard/endpoint/${endpoint.id}`}>
                            <Button variant="outline" size="sm" className="bg-white border-[#e1e3e5] text-[#202223] rounded-lg h-9 gap-2 px-5 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-[#f6f6f7] hover:border-[#c9cccf] shadow-xs">
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
