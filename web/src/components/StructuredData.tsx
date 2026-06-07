import { siteConfig } from "@/data/site";

// ----------------------------------------------------------------------------
// StructuredData.tsx — site-wide entity graph (CLAUDE.md Canonical Positioning
// & Entity Identity Rule / Pattern #100). Personal-brand / solo-operator build:
// the PERSON node (Garrett) and the PROFESSIONALSERVICE node (the practice) are
// cross-referenced by @id (Person.worksFor ↔ ProfessionalService.founder) so
// Google's Knowledge Graph + LLM entity resolution merge the web presence into
// one citable identity.
//
// NO fabricated awards/ratings/review counts — this buyer inspects schema. Only
// real, source-of-truth fields from site.ts.
//
// Mounted once in layout.tsx <body>. Server Component — emits a single
// <script type="application/ld+json"> via JSON.stringify (always valid JSON).
// ----------------------------------------------------------------------------

const url = siteConfig.url;
const BUSINESS_ID = `${url}/#business`;
const PERSON_ID = `${url}/#garrett`;

// sameAs is GUARDED against the empty LinkedIn placeholder: build the array from
// non-empty social URLs only, so we never emit `sameAs: [""]` (a blank string).
// [LAUNCH-BLOCKER: populate siteConfig.social.linkedin with the real LinkedIn
//  URL so this node links the live profile.]
const sameAs = ([siteConfig.social.linkedin] as readonly string[]).filter(
  (u) => u.length > 0,
);

export default function StructuredData() {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: siteConfig.name,
      description: siteConfig.description,
      url,
      email: siteConfig.contactEmail,
      areaServed: [
        siteConfig.serviceArea,
        "New England",
        "Greater Boston",
        "Southern New Hampshire",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brookline",
        addressRegion: "NH",
        addressCountry: "US",
      },
      founder: { "@id": PERSON_ID },
      knowsAbout: [
        "CMMC 2.0",
        "ITAR",
        "AS9100",
        "DFARS",
        "NIST SP 800-171",
        "Fractional COO",
        "Operations Architecture",
        "IT/OT Convergence",
        "Standard Work 2.0",
        "Defense Industrial Base Manufacturing",
      ],
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Garrett Partridge",
      jobTitle: "Fractional COO and Operations Architect",
      description:
        "Operations architect and fractional COO for New England defense industrial base manufacturers.",
      url,
      worksFor: { "@id": BUSINESS_ID },
      knowsAbout: [
        "CMMC 2.0",
        "ITAR",
        "AS9100",
        "DFARS",
        "NIST SP 800-171",
        "Lean Manufacturing",
        "Operations Leadership",
      ],
      // sameAs omitted when empty (no blank-string entry) — see LAUNCH-BLOCKER above.
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
