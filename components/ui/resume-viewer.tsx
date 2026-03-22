"use client";
import { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FileText, X, Download, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  trigger?: React.ReactNode;
  className?: string;
}

export default function ResumeViewer({ trigger, className }: ResumeViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <button
            className={cn(
              "flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-widest",
              "border border-primary/25 bg-primary/8 px-3 py-1.5 text-primary",
              "hover:border-primary/50 hover:bg-primary/15 transition-all duration-200",
              className,
            )}
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <FileText className="h-3 w-3" />
            View CV
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[96vw] max-w-4xl h-[90vh] translate-x-[-50%] translate-y-[-50%] flex flex-col border border-primary/20 bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-primary/15 px-4 py-3 bg-card/80 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="font-mono-accent text-xs text-primary uppercase tracking-widest">resume.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="RajatLakhina_CV.pdf"
                className="flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors px-2 py-1 border border-white/8 hover:border-primary/30"
              >
                <Download className="h-3 w-3" />
                Download
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors px-2 py-1 border border-white/8 hover:border-primary/30"
              >
                <ExternalLink className="h-3 w-3" />
                Open
              </a>
              <Dialog.Close className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
          </div>

          {/* PDF viewer */}
          <PdfViewer open={open} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Fetches PDF as a blob URL — bypasses X-Frame-Options / CSP frame restrictions */
function PdfViewer({ open }: { open: boolean }) {
  const [blobUrl, setBlobUrl]   = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(false);
  const urlRef                  = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    setError(false);

    fetch("/resume.pdf")
      .then(res => {
        if (!res.ok) throw new Error("fetch failed");
        return res.blob();
      })
      .then(blob => {
        // Revoke previous blob URL to avoid memory leaks
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        const url = URL.createObjectURL(blob);
        urlRef.current = url;
        setBlobUrl(url);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
      setBlobUrl(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="font-mono-accent text-[10px] uppercase tracking-widest">Loading CV...</span>
      </div>
    );
  }

  if (error || !blobUrl) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10 text-center">
        <FileText className="h-8 w-8 text-muted-foreground/30" />
        <div>
          <p className="font-mono-accent text-xs font-semibold text-muted-foreground">Preview unavailable</p>
          <p className="mt-1 font-mono-accent text-[10px] text-muted-foreground/50">Use Download or Open to view the CV</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/resume.pdf"
            download="RajatLakhina_CV.pdf"
            className="flex items-center gap-2 border border-primary/40 bg-primary/10 px-4 py-2 font-mono-accent text-[10px] uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <Download className="h-3 w-3" />
            Download CV
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 px-4 py-2 font-mono-accent text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
            style={{ clipPath: "polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))" }}
          >
            <ExternalLink className="h-3 w-3" />
            Open in Tab
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={blobUrl}
      className="flex-1 w-full border-0"
      title="Rajat Lakhina Resume"
    />
  );
}
