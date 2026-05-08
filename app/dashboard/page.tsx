import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Settings2, CheckCircle2, XCircle, MoreVertical, LayoutGrid, Zap, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

// Derived type from Prisma to avoid import issues
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
    <div className="bg-muted/30 min-h-[calc(100vh-64px)] pb-24">
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background p-6 rounded-lg border shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase">
               <Activity className="h-3 w-3" />
               <span>Control Center</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground uppercase italic">Your Flows</h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Monitor pipelines and manage sheet connections.
            </p>
          </div>
          <Link href="/dashboard/new">
            <Button className="rounded-lg h-11 px-6 gap-2 shadow-md hover:shadow-primary/20 transition-all font-black text-sm group overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary to-emerald-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10"></div>
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
              Create Flow
            </Button>
          </Link>
        </div>

        {endpoints.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 text-center border rounded-lg bg-background shadow-sm group">
            <div className="relative mb-6">
               <div className="relative rounded-lg bg-muted/50 p-6 shadow-inner">
                  <LayoutGrid className="h-12 w-12 text-muted-foreground" />
               </div>
            </div>
            <CardTitle className="text-xl font-black tracking-tight uppercase italic">No active flows</CardTitle>
            <CardDescription className="mt-2 text-sm max-w-md px-6 text-muted-foreground">
              Build your first automated pipeline to start capturing data.
            </CardDescription>
            <Link href="/dashboard/new" className="mt-6">
              <Button size="sm" className="rounded-lg h-10 px-6 gap-2 font-black shadow-sm">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
               <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Live Workflows
               </h2>
               <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                  {endpoints.length} Active
               </div>
            </div>
            
            <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30 border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="py-4 pl-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Flow</TableHead>
                      <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</TableHead>
                      <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Schema</TableHead>
                      <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Created</TableHead>
                      <TableHead className="py-4 text-right pr-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y">
                    {endpoints.map((endpoint: Endpoint) => (
                      <TableRow key={endpoint.id} className="group hover:bg-muted/5 transition-colors">
                        <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-3">
                             <div className="h-9 w-9 rounded-lg bg-primary/5 border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                <Activity className="h-4.5 w-4.5" />
                             </div>
                             <div className="flex flex-col">
                               <span className="font-bold text-sm tracking-tight text-foreground">{endpoint.name}</span>
                               <span className="text-[9px] font-mono text-muted-foreground opacity-60 truncate max-w-[120px]">ID: {endpoint.id}</span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          {endpoint.isActive ? (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 rounded-md px-2 py-0.5 font-black uppercase tracking-tighter text-[9px] flex items-center gap-1.5 w-fit shadow-xs">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-zinc-100 text-zinc-500 border-zinc-200 rounded-md px-2 py-0.5 font-black uppercase tracking-tighter text-[9px] flex items-center gap-1.5 w-fit opacity-60">
                              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                              Paused
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                             <div className="flex -space-x-2">
                               {(endpoint.schema as any[]).slice(0, 3).map((_, i) => (
                                 <div key={i} className="h-7 w-7 rounded-md border bg-background flex items-center justify-center text-[9px] font-black text-muted-foreground shadow-xs group-hover:-translate-y-0.5 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                                   {(endpoint.schema as any[])[i].name[0].toUpperCase()}
                                 </div>
                               ))}
                             </div>
                             <span className="text-[10px] font-bold text-muted-foreground/60">{(endpoint.schema as any[]).length} Keys</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-[11px] font-medium py-4">
                          {new Date(endpoint.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-right py-4 pr-6">
                          <Link href={`/dashboard/endpoint/${endpoint.id}`}>
                            <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2 px-4 font-black text-[10px] uppercase tracking-widest border transition-all hover:bg-primary hover:text-white hover:border-primary shadow-xs">
                              Manage
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
