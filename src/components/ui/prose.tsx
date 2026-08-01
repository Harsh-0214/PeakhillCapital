import type { Block } from '@/content/insights';
import { cn } from '@/lib/cn';

/**
 * Renders an article body from structured blocks.
 *
 * There is deliberately no `dangerouslySetInnerHTML` and no markdown-to-HTML
 * step anywhere in this path. Article bodies are typed data, so a malformed or
 * hostile string is rendered as text by React and can never become markup —
 * the entire class of stored-XSS bugs is designed out rather than sanitised
 * against. Supporting a new kind of content means adding a case here, which is
 * a feature: it keeps the content model small and reviewable.
 */
export function Prose({ blocks, className }: { blocks: Block[]; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-7', className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={index}
                className="mt-6 max-w-[22ch] text-2xl leading-tight text-ink first:mt-0"
              >
                {block.text}
              </h2>
            );

          case 'paragraph':
            return (
              <p key={index} className="prose-measure text-lg leading-[1.68] text-ink-soft">
                {block.text}
              </p>
            );

          case 'list':
            return (
              <ul key={index} className="prose-measure flex flex-col gap-3.5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-4 text-lg leading-[1.6] text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-[0.72em] h-px w-4 shrink-0 bg-brass-ink/50"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'quote':
            return (
              <figure key={index} className="my-4 border-l-2 border-brass py-1 pl-6 sm:pl-8">
                <blockquote className="max-w-[34ch] font-display text-2xl leading-[1.26] text-ink">
                  {block.text}
                </blockquote>
                {block.attribution ? (
                  <figcaption className="figure-label mt-4 text-ink-soft">
                    {block.attribution}
                  </figcaption>
                ) : null}
              </figure>
            );

          case 'note':
            return (
              <aside
                key={index}
                className="prose-measure border border-paper-line bg-paper-warm/70 p-5 text-sm leading-relaxed text-ink-soft"
              >
                <p className="figure-label mb-2 text-brass-ink">Note</p>
                <p>{block.text}</p>
              </aside>
            );

          default: {
            // Exhaustiveness check: adding a Block variant without handling it
            // here becomes a compile error rather than a silently blank page.
            const exhaustive: never = block;
            return exhaustive;
          }
        }
      })}
    </div>
  );
}
