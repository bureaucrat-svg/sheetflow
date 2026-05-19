import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, ShieldCheck, Zap, Globe, MousePointer2, Send, Database, Shield, Search, Fingerprint, Code, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "SheetFlow | Developer Automation for Google Sheets",
  description: "Capture JSON payloads via simple API webhooks and stream them seamlessly into Google Sheets. Built for developers, creators, and modern startups.",
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
    <div className="relative min-h-screen bg-transparent overflow-hidden">
      
      {/* Hero Section */}
      <section className="w-full pt-20 pb-28 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center text-center space-y-8">
          
          {/* Badge Indicators */}
          <div className="flex items-center justify-center gap-3 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium tracking-tight shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <span>Infrastructure Active</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium tracking-tight shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <GithubIcon className="h-3 w-3 text-zinc-400" />
               <span>MIT License</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-[68px] font-semibold tracking-tight max-w-4xl leading-[1.08] text-zinc-900 dark:text-zinc-50 font-sans">
            Automate JSON data streams directly into Google Sheets
          </h1>
          
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed font-normal">
            A developer-first micro-service that accepts raw JSON payloads through secured webhook endpoints and appends verified rows into spreadsheets. No setup friction.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 w-full sm:w-auto">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="h-11 px-6 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 transition-all gap-2 text-xs font-medium cursor-pointer shadow-sm w-full">
                Get Started Free
                <ChevronRight className="h-4 w-4 opacity-75" />
              </Button>
            </Link>
            <Link href="https://github.com/bureaucrat-svg/sheetflow" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-11 px-6 rounded-lg cursor-pointer gap-2 w-full text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-300 transition-all">
                <GithubIcon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                View on GitHub
              </Button>
            </Link>
          </div>

          {/* Value Cards - Technical Clean Grids */}
          <div className="grid sm:grid-cols-3 gap-6 pt-10 w-full max-w-5xl">
            {[
              { icon: MousePointer2, title: "Custom Schema Control", desc: "Define fields, validate data types, and map columns precisely to structural parameters." },
              { icon: ShieldCheck, title: "Zero Latency Queuing", desc: "Payloads are captured instantly, validated against strict filters, and routed safely." },
              { icon: Database, title: "Google Sheets Sync", desc: "Data appends automatically inside Google Spreadsheets in real-time as rows are created." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col space-y-4 p-6 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] group relative overflow-hidden text-left">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200">
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                   <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-50 tracking-tight">{step.title}</h4>
                   <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Architecture Visualization */}
      <section className="w-full py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 mb-16">
             <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">Sleek Pipeline Architecture</h2>
             <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl mx-auto font-normal">We receive inbound JSON payloads, validate fields, and execute App Scripts.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
             {/* Left: Input Payload Codeblock */}
             <div className="lg:col-span-5 flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-t-lg bg-zinc-950 border-b border-zinc-800 text-zinc-300 text-[10px] font-mono">
                   <div className="flex gap-1.5">
                     <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                     <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                     <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                   </div>
                   <span className="ml-4 opacity-60">request.json</span>
                </div>
                <div className="p-6 bg-zinc-900 rounded-b-lg border border-zinc-800 flex-1 font-mono text-[11px] text-zinc-400 leading-relaxed shadow-inner">
                   <pre className="overflow-x-auto"><code>{`{
  "customer": "Sarah Connor",
  "email": "sarah@skynet.com",
  "tier": "enterprise",
  "status": "authorized"
}`}</code></pre>
                </div>
             </div>

             {/* Middle: Middleware pipeline processes */}
             <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-4 py-6 lg:py-0">
                {[
                  { Icon: Shield, label: "Verify" },
                  { Icon: Search, label: "Parse" },
                  { Icon: Fingerprint, label: "Stream" }
                ].map(({ Icon, label }, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="h-10 w-10 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shadow-sm transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[9px] font-medium text-zinc-400 tracking-tight">{label}</span>
                  </div>
                ))}
             </div>

             {/* Right: Spreadsheets Spreadsheet visual */}
             <div className="lg:col-span-5 flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-t-lg bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-350 text-[10px] font-medium">
                   <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-500" />
                   <span className="text-zinc-600 dark:text-zinc-300">Google Sheet Database</span>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-b-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden flex-1 shadow-sm">
                   <div className="overflow-x-auto">
                      <table className="w-full text-[10px] min-w-[320px]">
                         <thead className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800/80">
                            <tr>
                               <th className="py-2.5 px-4 text-left font-semibold text-zinc-500 dark:text-zinc-400 tracking-tight">Customer Name</th>
                               <th className="py-2.5 px-4 text-left font-semibold text-zinc-500 dark:text-zinc-400 tracking-tight">Email</th>
                               <th className="py-2.5 px-4 text-left font-semibold text-zinc-500 dark:text-zinc-400 tracking-tight">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                            <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                               <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-100">Sarah Connor</td>
                               <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 font-mono">sarah@skynet.com</td>
                               <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-md text-[9px] font-medium border border-zinc-200 dark:border-zinc-700">Active</span>
                               </td>
                            </tr>
                            <tr className="opacity-45 bg-zinc-50/20 dark:bg-zinc-900/20">
                               <td className="py-3 px-4 font-medium text-zinc-800 dark:text-zinc-100">Kyle Reese</td>
                               <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400 font-mono">kyle@rebel.org</td>
                               <td className="py-3 px-4">
                                  <span className="px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 rounded-md text-[9px] font-medium border border-zinc-200/50 dark:border-zinc-800/50">Pending</span>
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

      {/* Feature Focus Grid */}
      <section className="w-full py-24 bg-transparent border-t border-zinc-200/80 dark:border-zinc-800/80 relative z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-10">
           <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">Open Source Infrastructure</h2>
           <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-relaxed">
             Deploy workflows directly to secure Google cloud environments. Maintain complete control of where your pipeline data goes.
           </p>
           <div className="grid md:grid-cols-3 gap-6 text-center pt-4">
              {[
                { title: "MIT Licensed", desc: "No subscriptions, usage limits, or payload limits. The pipeline is fully owned by you." },
                { title: "Immutable Data Control", desc: "Payloads stream directly from endpoints to Google Sheets without saving to external databases." },
                { title: "Start in 60s", desc: "Create an endpoint, copy the script to Google, and trigger requests in under a minute." }
              ].map((item, i) => (
                <div key={i} className="space-y-2 p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.01)] text-left">
                   <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-50 tracking-tight">{item.title}</h4>
                   <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
           <div className="pt-6">
              <Link href="/login">
                <Button size="lg" className="h-11 px-8 text-xs rounded-lg shadow-sm bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium tracking-tight">
                  Create Your Free Account
                </Button>
              </Link>
           </div>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="w-full py-12 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50 font-semibold text-[15px] tracking-tight">
            <div className="bg-zinc-950 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 p-1.5 rounded-lg text-white dark:text-zinc-950 shadow-sm">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <span>SheetFlow</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 dark:text-zinc-550">
             <Link href="https://github.com/bureaucrat-svg/sheetflow" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Documentation</Link>
             <Link href="https://github.com/bureaucrat-svg/sheetflow" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">GitHub Repository</Link>
             <span>© 2026 MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
