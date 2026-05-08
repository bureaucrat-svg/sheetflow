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
    <div className="flex flex-col items-center bg-[#f6f6f7] min-h-screen">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-32 overflow-hidden relative border-b border-[#e1e3e5] bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center space-y-10">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f1df] border border-[#bbe5b3] text-[#008060] text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck className="h-3.5 w-3.5" />
              <span>Production Ready</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f2f3] border border-[#e1e3e5] text-[#6d7175] text-[10px] font-black uppercase tracking-widest">
               <GithubIcon className="h-3.5 w-3.5" />
              <span>Open Infrastructure</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-5xl leading-none text-[#202223] uppercase italic">
            The <span className="text-[#008060]">Standard</span> for JSON to Sheets
          </h1>
          
          <p className="text-xl text-[#6d7175] max-w-3xl leading-relaxed font-medium">
            Deploy a **validated, open-source pipeline** to push JSON data via webhooks with automatic schema checks. Built for reliability, transparency, and speed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-xs rounded-lg shadow-sm bg-[#008060] hover:bg-[#006e52] text-white transition-all gap-3 font-black uppercase tracking-widest cursor-pointer">
                Establish Pipeline
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/bureaucrat-svg/sheetflow" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="h-14 px-10 text-xs rounded-lg cursor-pointer gap-3 w-full font-black uppercase tracking-widest border-[#e1e3e5] bg-white hover:bg-[#f6f6f7] text-[#202223]">
                <GithubIcon className="h-4 w-4" />
                Source Protocol
              </Button>
            </Link>
          </div>

          {/* Visualization Section */}
          <div className="pt-24 w-full max-w-6xl">
             <div className="grid md:grid-cols-3 gap-8 text-left">
                {[
                  { icon: MousePointer2, title: "Schema Mapping", desc: "Define your data architecture with precise JSON validation rules.", color: "bg-[#008060]/10 text-[#008060]" },
                  { icon: ShieldCheck, title: "Validation Logic", desc: "Every transmission is verified against your schema before execution.", color: "bg-[#008060]/10 text-[#008060]" },
                  { icon: Database, title: "Data Integrity", desc: "Clean, structured data is relayed to your Google Sheets instantly.", color: "bg-[#008060]/10 text-[#008060]" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col space-y-5 p-8 rounded-xl bg-[#f9fafb] border border-[#e1e3e5] hover:border-[#008060] transition-all group">
                    <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center shadow-inner", step.color)}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="font-black text-xs uppercase tracking-widest text-[#202223] italic">{step.title}</h4>
                       <p className="text-sm text-[#6d7175] leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Logic Visualization */}
      <section className="w-full py-24 bg-[#f6f6f7]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 mb-16">
             <h2 className="text-4xl font-black tracking-tighter text-[#202223] uppercase italic">Validation Engine</h2>
             <p className="text-[#6d7175] text-lg max-w-2xl mx-auto font-medium">Ensuring data integrity across the entire automation stack.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
             {/* Left: Input */}
             <div className="lg:col-span-5 space-y-0">
                <div className="flex items-center gap-3 px-4 py-3 rounded-t-lg bg-[#202223] text-white text-[10px] font-black tracking-widest uppercase">
                   <Send className="h-4 w-4 opacity-60" />
                   <span>Incoming JSON Payload</span>
                </div>
                <div className="p-8 bg-[#0b0c0d] rounded-b-lg shadow-xl border border-[#1a1c1d] font-mono text-xs text-[#aeb4b9] leading-relaxed">
                   <pre><code>{`{
  "customer": "Sarah Connor",
  "email": "sarah@skynet.com",
  "tier": "enterprise",
  "status": "authorized"
}`}</code></pre>
                </div>
             </div>

             {/* Middle: Controls */}
             <div className="lg:col-span-2 flex flex-col items-center justify-center gap-6 py-10 lg:py-0">
                {[Shield, Search, Fingerprint].map((Icon, i) => (
                  <div key={i} className="h-12 w-12 rounded-xl bg-white border border-[#e1e3e5] flex items-center justify-center text-[#008060] shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                ))}
             </div>

             {/* Right: Output */}
             <div className="lg:col-span-5 space-y-0">
                <div className="flex items-center gap-3 px-4 py-3 rounded-t-lg bg-[#008060] text-white text-[10px] font-black tracking-widest uppercase">
                   <FileSpreadsheet className="h-4 w-4 opacity-60" />
                   <span>Google Sheets Relay</span>
                </div>
                <div className="bg-white rounded-b-lg shadow-xl border border-[#e1e3e5] overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-[10px] min-w-[400px]">
                         <thead className="bg-[#fafafa] border-b border-[#e1e3e5]">
                            <tr>
                               <th className="p-4 text-left font-black uppercase tracking-widest text-[#6d7175]">Identity</th>
                               <th className="p-4 text-left font-black uppercase tracking-widest text-[#6d7175]">Email</th>
                               <th className="p-4 text-left font-black uppercase tracking-widest text-[#6d7175]">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-[#f1f2f3]">
                            <tr>
                               <td className="p-4 font-bold text-[#202223]">Sarah Connor</td>
                               <td className="p-4 text-[#6d7175]">sarah@skynet.com</td>
                               <td className="p-4">
                                  <span className="px-2 py-0.5 bg-[#e3f1df] text-[#008060] rounded-full text-[9px] font-black uppercase tracking-tight border border-[#bbe5b3]">Active</span>
                               </td>
                            </tr>
                            <tr className="opacity-40 bg-[#fafafa]">
                               <td className="p-4 font-bold text-[#202223]">Kyle Reese</td>
                               <td className="p-4 text-[#6d7175]">kyle@rebel.org</td>
                               <td className="p-4">
                                  <span className="px-2 py-0.5 bg-[#f1f2f3] text-[#6d7175] rounded-full text-[9px] font-black uppercase tracking-tight border border-[#e1e3e5]">Pending</span>
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

      {/* Community Section */}
      <section className="w-full py-32 bg-white border-y border-[#e1e3e5]">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl space-y-12">
           <h2 className="text-4xl font-black tracking-tighter text-[#202223] uppercase italic leading-none">Engineered for Transparency</h2>
           <p className="text-[#6d7175] text-xl font-medium leading-relaxed">
             Most automation platforms are black boxes. We believe your data pipelines should be transparent, secure, and community-driven.
           </p>
           <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { title: "Open Source", desc: "Full auditability of every data transmission." },
                { title: "No Vendor Lock", desc: "Deploy on any infrastructure, at any scale." },
                { title: "Enterprise Grade", desc: "Rigorous JSON validation out of the box." }
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                   <h4 className="font-black text-xs uppercase tracking-widest text-[#202223] italic">{item.title}</h4>
                   <p className="text-sm text-[#6d7175] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
           <div className="pt-8">
              <Link href="/login">
                <Button size="lg" className="h-14 px-12 text-xs rounded-lg shadow-sm bg-[#008060] hover:bg-[#006e52] text-white transition-all font-black uppercase tracking-widest">
                  Initialize Free Account
                </Button>
              </Link>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#f6f6f7]">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4 text-[#202223] font-black text-2xl tracking-tighter italic uppercase">
            <div className="bg-white border border-[#e1e3e5] p-2 rounded-xl text-[#008060] shadow-xs">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <span>SheetFlow</span>
          </div>
          <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-[#6d7175]">
             <Link href="https://github.com/bureaucrat-svg/sheetflow" className="hover:text-[#008060] transition-colors">Documentation</Link>
             <Link href="https://github.com/bureaucrat-svg/sheetflow" className="hover:text-[#008060] transition-colors">GitHub Protocol</Link>
             <span>© 2026 MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
