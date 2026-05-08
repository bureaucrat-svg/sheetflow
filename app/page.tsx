import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileSpreadsheet, ShieldCheck, Zap, Globe, MousePointer2, Send, Database, Shield, Fingerprint, Search, Code, CheckCircle2 } from "lucide-react";

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
      {/* Hero Section */}
      <section className="w-full pt-20 pb-32 overflow-hidden relative">
        {/* Abstract Material Background Shapes */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4">
          <div className="w-[500px] h-[500px] bg-primary/5 rounded-lg blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-10">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
               <ShieldCheck className="h-4 w-4" />
              <span>Validated Pipeline</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm font-medium">
               <GithubIcon className="h-4 w-4" />
              <span>100% Open Source</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]">
            The <span className="text-primary">Open Source</span> way to push JSON to Sheets
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Stop worrying about messy data. We provide a **validated, open-source pipeline** to push any JSON payload to your spreadsheets, with automatic schema checks and type safety.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 gap-2 font-bold cursor-pointer">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-lg cursor-pointer gap-2">
              <GithubIcon className="h-5 w-5" />
              Star on GitHub
            </Button>
          </div>

          {/* Unified Step Visualization (Single Line) */}
          <div className="pt-24 w-full max-w-6xl">
             <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 bg-white/50 backdrop-blur-sm border rounded-lg p-8 md:p-12 shadow-xl">
                
                {/* Step 1 */}
                <div className="flex-1 flex flex-col items-center space-y-4 text-center group">
                   <div className="h-20 w-20 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                     <MousePointer2 className="h-10 w-10" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-extrabold text-lg">1. Map Schema</h4>
                      <p className="text-sm text-muted-foreground max-w-[180px]">Define your data structure for perfect validation.</p>
                   </div>
                </div>

                {/* Arrow 1 */}
                <div className="hidden md:flex items-center justify-center -mt-12">
                   <div className="h-px w-12 bg-muted-foreground/20 relative">
                      <ArrowRight className="absolute -right-2 -top-2.5 h-5 w-5 text-muted-foreground/30" />
                   </div>
                </div>

                {/* Step 2 */}
                <div className="flex-1 flex flex-col items-center space-y-4 text-center group">
                   <div className="h-20 w-20 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-inner">
                     <ShieldCheck className="h-10 w-10" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-extrabold text-lg">2. Validate JSON</h4>
                      <p className="text-sm text-muted-foreground max-w-[180px]">Every push is verified against your rules instantly.</p>
                   </div>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:flex items-center justify-center -mt-12">
                   <div className="h-px w-12 bg-muted-foreground/20 relative">
                      <ArrowRight className="absolute -right-2 -top-2.5 h-5 w-5 text-muted-foreground/30" />
                   </div>
                </div>

                {/* Step 3 */}
                <div className="flex-1 flex flex-col items-center space-y-4 text-center group">
                   <div className="h-20 w-20 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform shadow-inner">
                     <Database className="h-10 w-10" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-extrabold text-lg">3. Organized Sync</h4>
                      <p className="text-sm text-muted-foreground max-w-[180px]">Clean, validated data lands in your Google Sheet.</p>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* Advanced Visualization Section */}
      <section className="w-full bg-muted/30 py-32 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Real-time JSON Validation</h2>
             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We don't just forward data; we ensure it's correct before it ever touches your spreadsheet.</p>
          </div>

          <div className="grid lg:grid-cols-7 gap-6 items-center">
             {/* Left: Raw JSON Input */}
             <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-zinc-800 text-zinc-400 text-xs font-bold border-x border-t border-zinc-700">
                   <Send className="h-3 w-3" />
                   <span>INCOMING JSON PAYLOAD</span>
                </div>
                <div className="p-6 bg-zinc-900 rounded-b-lg shadow-2xl border border-zinc-800 font-mono text-sm text-emerald-400 min-h-[240px]">
                   <pre><code>{`{
  "customer": "Alex Rivera",
  "email": "alex@example.com",
  "plan": "Premium",
  "amount": 49.99,
  "status": "paid"
}`}</code></pre>
                </div>
             </div>

             {/* Middle: Smart Checks */}
             <div className="lg:col-span-1 flex flex-col items-center justify-center gap-8 py-10 lg:py-0">
                <div className="group flex flex-col items-center gap-2">
                   <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Shield className="h-6 w-6" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Schema Check</span>
                </div>
                <div className="group flex flex-col items-center gap-2">
                   <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                      <Search className="h-6 w-6" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Type Match</span>
                </div>
                <div className="group flex flex-col items-center gap-2">
                   <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-sm">
                      <Fingerprint className="h-6 w-6" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Identity Verify</span>
                </div>
             </div>

             {/* Right: Google Sheet Result */}
             <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-emerald-600 text-white text-xs font-bold border-x border-t border-emerald-500">
                   <FileSpreadsheet className="h-3 w-3" />
                   <span>VALIDATED SHEET OUTPUT</span>
                </div>
                <div className="bg-background rounded-b-lg shadow-2xl border border-border overflow-hidden min-h-[240px]">
                   <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[600px] lg:min-w-0">
                         <thead className="bg-muted/50 border-b">
                            <tr>
                               <th className="p-3 text-left font-bold text-muted-foreground whitespace-nowrap">Customer</th>
                               <th className="p-3 text-left font-bold text-muted-foreground whitespace-nowrap">Email</th>
                               <th className="p-3 text-left font-bold text-muted-foreground whitespace-nowrap">Plan</th>
                               <th className="p-3 text-left font-bold text-muted-foreground whitespace-nowrap">Amount</th>
                               <th className="p-3 text-left font-bold text-muted-foreground whitespace-nowrap">Timestamp</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y">
                            <tr className="bg-emerald-50/30">
                               <td className="p-3 font-medium whitespace-nowrap">Alex Rivera</td>
                               <td className="p-3 whitespace-nowrap">alex@example.com</td>
                               <td className="p-3 font-bold text-primary whitespace-nowrap">Premium</td>
                               <td className="p-3 font-bold whitespace-nowrap">$49.99</td>
                               <td className="p-3 text-muted-foreground text-[10px] whitespace-nowrap">Just Now</td>
                            </tr>
                            <tr className="opacity-40">
                               <td className="p-3 whitespace-nowrap">Sarah Chen</td>
                               <td className="p-3 whitespace-nowrap">sarah@gmail.com</td>
                               <td className="p-3 font-bold text-primary whitespace-nowrap">Basic</td>
                               <td className="p-3 font-bold whitespace-nowrap">$19.00</td>
                               <td className="p-3 text-muted-foreground text-[10px] whitespace-nowrap">2 hours ago</td>
                            </tr>
                            <tr className="opacity-20">
                               <td className="p-3 whitespace-nowrap">Mike Ross</td>
                               <td className="p-3 whitespace-nowrap">mike@law.co</td>
                               <td className="p-3 font-bold text-primary whitespace-nowrap">Pro</td>
                               <td className="p-3 font-bold whitespace-nowrap">$29.00</td>
                               <td className="p-3 text-muted-foreground text-[10px] whitespace-nowrap">Yesterday</td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="w-full py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Open Source & Transparent</h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 Most automation tools are black boxes. We believe your data pipeline should be transparent, secure, and community-driven.
               </p>
               <p className="text-lg text-muted-foreground leading-relaxed">
                 <b>SheetFlow is 100% open-source.</b> You can inspect the code, host it yourself, and contribute to making data automation more reliable for everyone.
               </p>
               <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-lg text-foreground">Self-hostable architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-lg text-foreground">Community audit and trust</span>
                  </div>
               </div>
            </div>
            <div className="bg-primary rounded-lg p-8 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-lg" />
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight relative z-10 leading-tight">Join our open community</h2>
              <p className="text-primary-foreground/80 text-xl max-w-xl mx-auto relative z-10">Contribute to the future of data automation or start using it for free today.</p>
              <div className="pt-4 relative z-10">
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="h-16 px-12 text-xl rounded-lg font-bold shadow-2xl cursor-pointer">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto py-32 px-4 border-t">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Validated Difference</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-6 group">
            <div className="h-16 w-16 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold">Transparent Code</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every line of our codebase is public. No hidden trackers, no proprietary black boxes. Just pure automation.
            </p>
          </div>
          <div className="space-y-6 group">
            <div className="h-16 w-16 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold">Strict Schema Checks</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We validate every single piece of JSON before it hits your sheet. No more missing fields or messy spreadsheets.
            </p>
          </div>
          <div className="space-y-6 group">
            <div className="h-16 w-16 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold">Community Driven</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Built by and for the community. Benefit from the collective improvements of developers around the world.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
