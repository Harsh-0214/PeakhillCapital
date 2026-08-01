/**
 * The single place in this codebase where raw markup is injected.
 *
 * Two things make it safe, and both matter:
 *
 * 1. The input is always a plain object built in `lib/jsonld.ts` from typed
 *    content modules. It is never user input and never a string from a request.
 * 2. `JSON.stringify` output is still escaped before injection. A `<` inside a
 *    string value would otherwise let a crafted payload close the script tag
 *    early — the classic JSON-in-HTML break-out. Escaping `<`, `>` and `&`
 *    into unicode sequences keeps the JSON semantically identical while making
 *    that impossible.
 *
 * Nothing else on this site uses `dangerouslySetInnerHTML`.
 */
function serialize(schema: Record<string, unknown>): string {
  return JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function JsonLd({ schema, id }: { schema: Record<string, unknown>; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(schema) }}
    />
  );
}
