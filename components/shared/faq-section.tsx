import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { faqSchema } from "@/lib/seo";

/**
 * Visible FAQ block that also emits the matching FAQPage structured data from
 * the same data, so the on-page answers and the schema never drift apart.
 * Great for featured snippets, "People also ask" and AI search engines.
 */
export function FaqSection({
  title = "Frequently Asked Questions",
  subtitle,
  faqs,
}: {
  title?: string;
  subtitle?: string;
  faqs: { q: string; a: string }[];
}) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-heading" className="scroll-mt-24">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mb-4">
        <h2
          id="faq-heading"
          className="font-display text-xl font-bold tracking-tight sm:text-2xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <Accordion items={faqs} />
    </section>
  );
}
