import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import { Helmet } from "react-helmet-async";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OAS-NEON",
  url: "https://oas-neon.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://oas-neon.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OAS-NEON",
  url: "https://oas-neon.com",
  logo: "https://oas-neon.com/logo.webp",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+420777034364",
    contactType: "customer service",
    areaServed: "CZ",
    availableLanguage: "Czech",
  },
};

export default function HomeDetail() {
  return (
    <>
      <Helmet>
        <title>Domovská stránka | OAS-NEON</title>
        <link rel="canonical" href="https://oas-neon.com" />
        <meta
          name="description"
          content="OAS-NEON - Výroba neonových reklam, potisků a polepů."
        />
        <meta
          name="keywords"
          content="neony, reklamy, potisky, polepy, výroba na míru"
        />
        <meta name="author" content="OAS-NEON" />
        <meta
          property="og:title"
          content="OAS-NEON - Reklamy a zábava na míru"
        />
        <meta
          property="og:description"
          content="S více než 25 lety zkušeností nabízíme špičkové reklamní služby."
        />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta property="og:url" content="https://oas-neon.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>
      <Header />
      <Divider />
      <AboutUs />
      <Divider />
      <FAQ />
      <Footer />
    </>
  );
}
