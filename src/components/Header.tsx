import Navbar from "./Navbar";
import { Helmet } from "react-helmet-async"; // Import Helmet
import backgroundImage from "../images/background.webp";

export default function Header() {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const structuredDataWebSite = {
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

  const structuredDataOrganization = {
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

  return (
    <>
      <Helmet>
        <title>OAS-NEON - Reklamy a zábava na míru</title>
        <meta
          name="description"
          content="S více než 25 lety zkušeností nabízíme výrobu neonových reklam, potisků na textil a polepů na auta. Vaše vize proměníme v realitu."
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredDataWebSite)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(structuredDataOrganization)}
        </script>
      </Helmet>
      <div className="relative h-screen text-white">
        <Navbar />
        <div className="absolute inset-0 -z-10">
          <img
            src={backgroundImage}
            alt="Výroba reklam a zábavy"
            className="h-full w-auto min-w-full lg:object-cover sm:object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1
                className=" text-5xl md:text-6xl lg:md:text-6xl font-extrabold tracking-tight leading-tight text-[#E60202] animate-fall"
                style={{
                  fontFamily: "mexcellent",
                  textShadow:
                    "0 0 20px rgba(230, 2, 2, 0.8), 0 0 30px rgba(230, 2, 2, 0.6)",
                }}
              >
                Reklamy a zábava na míru, které oslní
              </h1>
              <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl animate-fall delay-200">
                S více než <strong>25 lety zkušeností</strong> nabízíme výrobu
                <strong> neonových reklam</strong>,{" "}
                <strong>potisků na textil</strong>, a
                <strong> polepů na auta</strong>. Vaše vize proměníme v realitu
                s precizností a jedinečným stylem.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 animate-fall delay-500">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("kontakt");
                  }}
                  className="rounded-md bg-[#ff007f] px-5 py-3 cursor-pointer text-sm font-semibold text-white shadow-lg hover:bg-[#BF053D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff007f] transition-all duration-300"
                  aria-label="Kontaktujte nás"
                  style={{
                    textShadow: "0 0 10px #ff007f, 0 0 20px #ff007f",
                  }}
                >
                  Kontaktujte nás
                </a>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll("about-us");
                  }}
                  className="text-sm font-semibold cursor-pointer leading-6 text-[#00ffff] hover:text-[#00C5C5] transition-all duration-300"
                  aria-label="Zjistěte více"
                  style={{
                    textShadow: "0 0 8px #00ffff, 0 0 16px #00ffff",
                  }}
                >
                  Zjistěte více <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
