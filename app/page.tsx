import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, ShieldCheck, Zap, Globe, MousePointer2, Send, Database, Shield, Fingerprint, Search, Code, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "SheetFlow | Open Source Validated JSON to Google Sheets",
  description: "The most reliable and open-source validated way to push any JSON data to Google Sheets via webhooks with automatic schema checks.",
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section - More Compact & Focused */}
      <section className="w-full pt-16 pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4">
          <div className="w-[500px] h-[500px] bg-primary/5 rounded-lg blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest">
               <ShieldCheck className="h-3.5 w-3.5" />
              <span>Validated</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-[11px] font-black uppercase tracking-widest">
               <GithubIcon className="h-3.5 w-3.5" />
              <span>Open Source</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl leading-[1.1] italic uppercase">
            The <span className="text-primary">Reliable</span> way to push JSON to Sheets
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Eliminate messy spreadsheets. A **validated, open-source pipeline** to push JSON data via webhooks with automatic schema checks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-base rounded-lg shadow-md hover:shadow-lg transition-all gap-2 font-black cursor-pointer">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/bureaucrat-svg/sheetflow" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-lg cursor-pointer gap-2 w-full font-bold">
                <GithubIcon className="h-4 w-4" />
                View on GitHub
              </Button>
            </Link>
          </div>

          {/* Compact Step Visualization */}
          <div className="pt-16 w-full max-w-5xl">
             <div className="relative grid md:grid-cols-3 gap-6 bg-background p-6 rounded-lg border shadow-sm">
                {[
                  { icon: MousePointer2, title: "1. Map Schema", desc: "Define your data structure for perfect validation.", color: "primary" },
                  { icon: ShieldCheck, title: "2. Validate JSON", desc: "Every push is verified against your rules instantly.", color: "emerald-600" },
                  { icon: Database, title: "3. Organized Sync", desc: "Clean data lands in your Google Sheet.", color: "yellow-600" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center space-y-3 text-center p-4 rounded-lg hover:bg-muted/30 transition-colors group">
                    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", 
                      i === 0 ? "bg-primary/10 text-primary" : 
                      i === 1 ? "bg-emerald-500/10 text-emerald-600" : 
                      "bg-yellow-500/10 text-yellow-600"
                    )}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-black text-base uppercase italic tracking-tight">{step.title}</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Advanced Visualization Section - More Compact */}
      <section className="w-full bg-muted/30 py-20 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
             <h2 className="text-3xl font-black tracking-tight uppercase italic">JSON Validation Engine</h2>
             <p className="text-muted-foreground text-base max-w-xl mx-auto font-medium">We ensure data integrity before it ever touches your spreadsheet.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-4 items-center max-w-6xl mx-auto">
             {/* Left: Raw JSON Input */}
             <div className="lg:col-span-4 space-y-0">
                <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg bg-zinc-800 text-zinc-400 text-[10px] font-black tracking-widest border-x border-t border-zinc-700 uppercase">
                   <Send className="h-3 w-3" />
                   <span>Incoming Payload</span>
                </div>
                <div className="p-5 bg-zinc-900 rounded-b-lg shadow-xl border border-zinc-800 font-mono text-xs text-emerald-400">
                   <pre className="leading-relaxed"><code>{`{
  "customer": "Alex Rivera",
  "email": "alex@example.com",
  "amount": 49.99,
  "status": "paid"
}`}</code></pre>
                </div>
             </div>

             {/* Middle: Smart Checks */}
             <div className="lg:col-span-1 flex flex-col items-center justify-center gap-4 py-6 lg:py-0">
                {[
                  { icon: Shield, label: "Schema", color: "primary" },
                  { icon: Search, label: "Types", color: "emerald" },
                  { icon: Fingerprint, label: "Identity", color: "purple" }
                ].map((item, i) => (
                  <div key={i} className="group flex flex-col items-center gap-1">
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shadow-sm border bg-background group-hover:scale-110 transition-all", 
                      i === 0 ? "text-primary border-primary/20" : 
                      i === 1 ? "text-emerald-600 border-emerald-200" : 
                      "text-purple-600 border-purple-200"
                    )}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                ))}
             </div>

             {/* Right: Google Sheet Result */}
             <div className="lg:col-span-7 space-y-0">
                <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg bg-emerald-600 text-white text-[10px] font-black tracking-widest border-x border-t border-emerald-500 uppercase">
                   <FileSpreadsheet className="h-3 w-3" />
                   <span>Sheet Output</span>
                </div>
                <div className="bg-background rounded-b-lg shadow-xl border border-border overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-[11px] min-w-[500px]">
                         <thead className="bg-muted/50 border-b">
                            <tr>
                               <th className="p-3 text-left font-black uppercase tracking-tighter text-muted-foreground whitespace-nowrap">Customer</th>
                               <th className="p-3 text-left font-black uppercase tracking-tighter text-muted-foreground whitespace-nowrap">Email</th>
                               <th className="p-3 text-left font-black uppercase tracking-tighter text-muted-foreground whitespace-nowrap">Amount</th>
                               <th className="p-3 text-left font-black uppercase tracking-tighter text-muted-foreground whitespace-nowrap">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y">
                            <tr className="bg-emerald-50/20">
                               <td className="p-3 font-bold whitespace-nowrap">Alex Rivera</td>
                               <td className="p-3 whitespace-nowrap">alex@example.com</td>
                               <td className="p-3 font-bold text-primary whitespace-nowrap">$49.99</td>
                               <td className="p-3 whitespace-nowrap">
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase">Paid</span>
                               </td>
                            </tr>
                            <tr className="opacity-40">
                               <td className="p-3 whitespace-nowrap">Sarah Chen</td>
                               <td className="p-3 whitespace-nowrap">sarah@gmail.com</td>
                               <td className="p-3 font-bold text-primary whitespace-nowrap">$19.00</td>
                               <td className="p-3 whitespace-nowrap">
                                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded text-[9px] font-black uppercase">Pending</span>
                               </td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
               <h2 className="text-3xl font-black tracking-tight uppercase italic">100% Transparent</h2>
               <p className="text-base text-muted-foreground leading-relaxed">
                 Most automation tools are black boxes. We believe your data pipeline should be transparent, secure, and community-driven.
               </p>
               <div className="space-y-3 pt-2">
                  {[
                    "Self-hostable architecture",
                    "Community audited codebase",
                    "No proprietary locking"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-bold text-sm text-foreground">{text}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-primary rounded-lg p-10 md:p-14 text-center space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-lg rotate-12" />
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight relative z-10 leading-tight italic uppercase">Join the community</h2>
              <div className="pt-2 relative z-10">
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="h-12 px-10 text-base rounded-lg font-black shadow-lg cursor-pointer">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto py-20 px-4 border-t">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Code, title: "Pure Code", desc: "Public codebase. No hidden trackers, no proprietary black boxes.", color: "blue" },
            { icon: ShieldCheck, title: "Schema Guard", desc: "Strict JSON validation before any data touches your sheets.", color: "emerald" },
            { icon: Globe, title: "Global Access", desc: "Built by the community, for everyone. Hosted anywhere.", color: "purple" }
          ].map((benefit, i) => (
            <div key={i} className="space-y-4">
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center transition-transform", 
                i === 0 ? "bg-blue-500/10 text-blue-600" : 
                i === 1 ? "bg-emerald-500/10 text-emerald-600" : 
                "bg-purple-500/10 text-purple-600"
              )}>
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase italic tracking-tight">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="w-full py-10 border-t bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-lg tracking-tight italic uppercase">
            <div className="bg-primary/10 p-1 rounded-lg">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
            </div>
            <span>SheetFlow</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest">
            © 2026 SheetFlow • MIT License
          </p>
          <Link href="https://github.com/bureaucrat-svg/sheetflow" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
            <GithubIcon className="h-4 w-4" />
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
