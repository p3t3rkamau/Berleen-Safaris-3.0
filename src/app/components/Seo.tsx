// components/SEO.tsx
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }: any) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Berleen Safaris",
          url: "https://www.berleensafaris.com",
          logo: "https://www.berleensafaris.com/assets/img/logo.png"
        })}
      </script>
    </Helmet>
  );
}