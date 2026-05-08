import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Settings2, CheckCircle2, XCircle, MoreVertical, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// Derived type from Prisma to avoid import issues
type Endpoint = Awaited<ReturnType<typeof prisma.endpoint.findMany>>[number];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const endpoints = await prisma.endpoint.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-muted/30 min-h-[calc(100vh-64px)] pb-20">
      <div className="container mx-auto px-4 md:px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background p-6 md:p-8 rounded-[2rem] border shadow-sm">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Your Endpoints</h1>
            <p className="text-muted-foreground text-lg">
              Manage your webhook data pipelines and schema definitions.
            </p>
          </div>
          <Link href="/dashboard/new">
            <Button className="rounded-full h-12 px-8 gap-2 shadow-lg hover:shadow-xl transition-all">
              <Plus className="h-5 w-5" />
              Create Endpoint
            </Button>
          </Link>
        </div>

        {endpoints.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-20 md:py-32 text-center border-dashed rounded-[3rem] bg-background/50">
            <div className="rounded-[2.5rem] bg-primary/10 p-8 md:p-10 mb-6 group hover:scale-110 transition-transform">
              <LayoutGrid className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">No endpoints yet</CardTitle>
            <CardDescription className="mt-3 text-lg max-w-sm px-4">
              Create your first endpoint to start capturing data and forwarding it to Google Sheets.
            </CardDescription>
            <Link href="/dashboard/new" className="mt-8">
              <Button size="lg" className="rounded-full h-12 px-8">Create your first endpoint</Button>
            </Link>
          </Card>
        ) : (
          <div className="bg-background rounded-[2.5rem] border shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-muted/20 flex items-center justify-between">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-muted-foreground" />
                Active Workflows
              </h2>
              <Badge variant="secondary" className="rounded-full px-3">
                {endpoints.length} Total
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="py-4 pl-8 min-w-[200px]">Name</TableHead>
                    <TableHead className="py-4 min-w-[120px]">Status</TableHead>
                    <TableHead className="py-4 min-w-[120px]">Fields</TableHead>
                    <TableHead className="py-4 min-w-[150px]">Created</TableHead>
                    <TableHead className="py-4 text-right pr-8 min-w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint: Endpoint) => (
                    <TableRow key={endpoint.id} className="group hover:bg-muted/10 transition-colors border-b last:border-0">
                      <TableCell className="font-semibold py-6 pl-8">
                        <div className="flex flex-col">
                          <span>{endpoint.name}</span>
                          <span className="text-xs font-mono text-muted-foreground mt-1 truncate max-w-[200px]">ID: {endpoint.id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        {endpoint.isActive ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 rounded-full px-3 py-0.5 font-medium flex items-center gap-1.5 w-fit">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-zinc-100 text-zinc-500 border-zinc-200 rounded-full px-3 py-0.5 font-medium flex items-center gap-1.5 w-fit">
                            <XCircle className="h-3.5 w-3.5" /> Paused
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex -space-x-2">
                          {(endpoint.schema as any[]).slice(0, 3).map((_, i) => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                              {(endpoint.schema as any[])[i].name[0].toUpperCase()}
                            </div>
                          ))}
                          {(endpoint.schema as any[]).length > 3 && (
                            <div className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                              +{(endpoint.schema as any[]).length - 3}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm py-6">
                        {new Date(endpoint.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-right py-6 pr-8">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/endpoint/${endpoint.id}`}>
                            <Button variant="outline" size="sm" className="rounded-full gap-2 px-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                              <Settings2 className="h-4 w-4" />
                              Manage
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
