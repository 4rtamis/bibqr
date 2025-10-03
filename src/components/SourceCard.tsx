import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Source } from "@/types";

export function SourceCard({ source }: { source: Source }) {
  const hasLink = Boolean(source.link);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-5">
        {/* Chicago citation (markdown-enabled) */}
        <div className="markdown text-sm leading-relaxed sm:text-base break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {source.citationChicago}
          </ReactMarkdown>
        </div>

        {/* Description (optional, markdown-enabled) */}
        {source.description ? (
          <div className="markdown mt-3 text-xs sm:text-sm text-muted-foreground [&_a]:break-all">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {source.description}
            </ReactMarkdown>
          </div>
        ) : null}

        {/* Tags */}
        {source.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {source.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className={`border-0 text-[11px] px-2 py-0.5 rounded-full`}
                data-tag={t}
                title={t}
              >
                {t}
              </Badge>
            ))}
          </div>
        ) : null}

        {/* Link */}
        {hasLink ? (
          <>
            <Separator className="my-3" />
            <div className="flex items-center justify-end">
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open source link"
                >
                  Get it
                </a>
              </Button>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
