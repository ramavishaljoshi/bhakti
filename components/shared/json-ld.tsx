/**
 * Renders one or more JSON-LD structured-data blocks. Server-rendered into the
 * static HTML so crawlers and AI search engines read the schema immediately.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // schema objects are built from trusted, static app data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
