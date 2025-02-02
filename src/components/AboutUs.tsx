import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import Work from "./Work";
import ContactForm from "./ContactForm";
import aboutUsImage from "../images/aboutus.webp";
import neon from "../images/neon4.webp";
import heroBck from "../images/aboutus_bck.webp";
import "./aboutus.css";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const structuredDataAboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "O Nás | OAS-NEON",
    url: "https://oas-neon.cz/about-us",
    description:
      "S více než 25 lety zkušeností nabízíme výrobu neonových reklam, potisků na textil a polepů na auta a vlaky.",
    mainEntity: {
      "@type": "Organization",
      name: "OAS-NEON",
      url: "https://oas-neon.cz",
      logo: "https://oas-neon.cz/logo.webp",
      description:
        "Jsme specialisté na výrobu neonových reklam, potisků na textil a řezanou reklamu.",
      foundingDate: "1998",
      founder: "Petr Jiří",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+420777034364",
        contactType: "customer service",
        areaServed: "CZ",
        availableLanguage: ["Czech", "English"],
      },
      sameAs: [
        "https://www.facebook.com/petrjiri.brejsa",
        "https://www.instagram.com/oas_neon/",
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>O Nás | OAS-NEON</title>
        <meta
          name="description"
          content="S více než 25 lety zkušeností nabízíme výrobu neonových reklam, potisků na textil a polepů na auta a vlaky."
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredDataAboutPage)}
        </script>
      </Helmet>
      <section
        id="about-us"
        className="py-24 bg-[#111111] relative overflow-hidden"
        style={{
          backgroundImage: `url(${neon})`,
          backgroundSize: "contain",
          backgroundRepeat: "repeat-y",
          width: "100vw",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-2 mx-auto mb-20 relative rounded-3xl">
          <div
            ref={sectionRef}
            className={`px-4 py-5 md:py-10 lg:py-10 md:px-10 lg:px-10 mx-auto rounded-3xl bg-transparent ${
              isVisible ? "animate-slide-up" : "opacity-0 translate-y-10"
            }`}
            style={{
              backgroundImage: `url(${heroBck})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            <div
              className="gradient-background"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 0, 128, 1), rgba(0, 0, 255, 1))", // Gradient jako pozadí
                boxShadow:
                  "0 0 10px rgba(255, 0, 128, 0.8), 0 0 20px rgba(255, 0, 128, 0.6), 0 0 30px rgba(0, 0, 255, 0.8), 0 0 40px rgba(0, 0, 255, 0.6)", // Přidání více vrstev stínu
                borderRadius: "1.5rem", // Zaoblené rohy celého elementu
                padding: "10px", // Simulace prostoru pro border
                overflow: "hidden", // Obsah zůstane uvnitř
              }}
            >
              <div
                className="inner-content"
                style={{
                  background: `url(${heroBck}) center / cover no-repeat, #000`, // Vnitřní pozadí
                  borderRadius: "1.5rem", // Zaoblené rohy vnitřního obsahu
                  padding: "20px", // Odsazení vnitřního obsahu
                  boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)", // Mírný stín pro zvýraznění
                }}
              >
                {/* Obsah sekce */}
                <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-12 py-6 px-3">
                  {/* Levý sloupec */}
                  <div className="relative">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        className="object-cover w-full"
                        src={aboutUsImage}
                        alt="About Us"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75" />
                  </div>

                  {/* Pravý sloupec */}
                  <div className="text-white flex flex-col lg:items-start xl:items-start md:items-center gap-8">
                    <h2
                      className="sm:text-3xl md:text-5xl text-4xl font-bold leading-snug font-manrope neon-text xl:text-left md:text-center"
                      style={{
                        textShadow:
                          "0 0 12px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
                        color: "#ff007f",
                        fontFamily: "mexcellent",
                      }}
                    >
                      Vytváříme reklamy a zábavu na míru
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed text-justify">
                      S více než 25 lety zkušeností jsme tu, abychom přetvořili
                      vaše nápady v realitu. Od neonových reklam, které oslní,
                      přes zakázkovou výrobu obrázků na trička až po polepy na
                      auta a vlaky – dáváme vašim vizím život. Jsme pyšní na
                      každý projekt a na důvěru našich klientů.
                    </p>
                    <div className="flex gap-10 flex-wrap justify-center md:justify-start">
                      <div className="flex flex-col items-center md:items-start">
                        <h3
                          className="text-4xl font-bold neon-text"
                          style={{
                            textShadow:
                              "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6)",
                            color: "#00ffff",
                          }}
                        >
                          25+
                        </h3>
                        <p className="text-gray-400">Let zkušeností</p>
                      </div>
                      <div className="flex flex-col items-center md:items-start">
                        <h3
                          className="text-4xl font-bold neon-text"
                          style={{
                            textShadow:
                              "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6)",
                            color: "#ffff00",
                          }}
                        >
                          3250+
                        </h3>
                        <p className="text-gray-400">Úspěšných projektů</p>
                      </div>
                      <div className="flex flex-col items-center md:items-start">
                        <h3
                          className="text-4xl font-bold neon-text"
                          style={{
                            textShadow:
                              "0 0 10px rgba(255, 128, 0, 0.8), 0 0 20px rgba(255, 128, 0, 0.6)",
                            color: "#ff8000",
                          }}
                        >
                          1570+
                        </h3>
                        <p className="text-gray-400">Spokojených klientů</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Work index={0} />
        <Work index={1} />
        <Work index={2} />

        <ContactForm />
      </section>
    </>
  );
}
