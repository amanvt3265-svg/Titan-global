// Injects JSON-LD structured data into the document head.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, static content generated on the server.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
