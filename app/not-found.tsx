import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-56px)] w-full flex items-center justify-center p-4 md:p-8 bg-transparent relative z-10">
      <div className="w-full max-w-[420px] text-center space-y-6 animate-in fade-in duration-300">
        
        {/* Big minimalist 404 indicator */}
        <div className="relative flex justify-center items-center">
          <span className="text-[120px] font-extrabold tracking-tighter text-zinc-900/5 dark:text-zinc-100/5 select-none leading-none font-mono">
            404
          </span>
          <div className="absolute h-12 w-12 bg-zinc-950 dark:bg-zinc-50 border border-zinc-800 dark:border-zinc-200 rounded-xl flex items-center justify-center text-white dark:text-zinc-950 shadow-md">
            <FileQuestion className="h-5 w-5 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">Flow Connection Missing</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal max-w-sm mx-auto leading-relaxed">
            The spreadsheet endpoint or system configuration route you requested does not exist or has been deleted from our database.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline" className="rounded-lg h-9 px-4 text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-500 dark:text-zinc-400 cursor-pointer shadow-sm">
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-zinc-950 hover:bg-zinc-850 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg h-9 px-5 text-xs font-medium tracking-tight gap-1.5 shadow-sm transition-all cursor-pointer">
              <ArrowLeft className="h-3.5 w-3.5" />
              Go to Workspace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
