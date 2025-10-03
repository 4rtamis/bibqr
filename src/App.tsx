import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SourceCard } from "@/components/SourceCard";
import type { Source } from "@/types";
import { QRCodeCanvas } from "qrcode.react";
import ThemeToggle from "@/components/ThemeToggle";
import { useParams } from "react-router-dom";
import { resolveBibliography } from "@/data/bibliographies";

// fetch via a vetted filename only
function useSources(file: string | null) {
  const [data, setData] = useState<Source[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!file) {
      setData(null);
      setError("Unknown bibliography");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const base = (import.meta as any).env.BASE_URL || "/";
    fetch(`${base}${file}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${file} (${r.status})`);
        return r.json();
      })
      .then((json: Source[]) => setData(json))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [file]);

  return { data, error, loading };
}

export default function App() {
  const { slug } = useParams();
  const cfg = resolveBibliography(slug);
  const { data, error, loading } = useSources(cfg?.file ?? null);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = cfg?.title ?? "Unknown bibliography";

  const [copied, setCopied] = useState(false);

  const { recommended, others } = useMemo(() => {
    const list = data ?? [];
    const rec = list.filter((s) => s.recommended);
    const rest = list.filter((s) => !s.recommended);
    return { recommended: rec, others: rest };
  }, [data]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="min-h-svh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-base font-semibold sm:text-lg">bibqr</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="default">
                  Share
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="pb-8">
                <SheetHeader>
                  <SheetTitle className="text-base">
                    Share this bibliography
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col items-center gap-4">
                  <QRCodeCanvas value={pageUrl} size={192} includeMargin />
                  <div className="text-center break-all text-xs text-muted-foreground max-w-full px-2">
                    {pageUrl}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={copyLink}>
                      {copied ? "Copied!" : "Copy link"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 py-4 sm:py-6">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl mb-8">
          {title}
        </h1>

        {cfg === null ? (
          <div className="text-sm text-destructive">
            This bibliography does not exist. Check the link or choose another
            slug.
          </div>
        ) : (
          <>
            {/* Recommended */}
            <section>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Recommended sources
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-3">
                {loading && (
                  <div className="text-sm text-muted-foreground">
                    Loading sources…
                  </div>
                )}
                {error && (
                  <div className="text-sm text-destructive">{error}</div>
                )}
                {!loading && !error && recommended.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No recommended sources yet.
                  </div>
                )}
                {recommended.map((s) => (
                  <SourceCard key={s.id} source={s} />
                ))}
              </div>
            </section>

            <Separator className="my-6" />

            {/* All others */}
            <section>
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
                All sources
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-3">
                {others.map((s) => (
                  <SourceCard key={s.id} source={s} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-2xl px-4 py-10 text-center text-xs text-muted-foreground">
        bibqr - a simple open-source bibliography sharing app by 4rtamis
      </footer>
    </div>
  );
}
