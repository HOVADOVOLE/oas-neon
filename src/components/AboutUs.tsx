import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import Work from "./Work";
import ContactForm from "./ContactForm";
import aboutUsImage from "../images/aboutus.webp";
import neon from "../images/neon.webp";
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
    url: "https://oas-neon.com/about-us",
    description:
      "S více než 25 lety zkušeností nabízíme výrobu neonových reklam, potisků na textil a polepů na auta a vlaky.",
    mainEntity: {
      "@type": "Organization",
      name: "OAS-NEON",
      url: "https://oas-neon.com",
      logo: "https://oas-neon.com/logo.webp",
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
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-2 mx-auto mb-20 relative rounded-3xl">
          <div
            className={`gradient-background py-12 px-10 rounded-3xl bg-transparent ${
              isVisible ? "animate-slide-up" : "opacity-0 translate-y-10"
            }`}
            ref={sectionRef}
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
              className="inner-content"
              style={{
                background: `url(${heroBck}) center / cover no-repeat, #000`,
                borderRadius: "1.5rem",
                padding: "20px",
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-12 py-6 px-3">
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
                <div className="text-white flex flex-col lg:items-start xl:items-start md:items-center gap-8">
                  <h2
                    className="text-5xl font-bold leading-snug font-manrope neon-text xl:text-left md:text-center"
                    style={{
                      textShadow:
                        "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
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
                    auta a vlaky – dáváme vašim vizím život. Jsme pyšní na každý
                    projekt a na důvěru našich klientů.
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
        <Work index={0} />
        <Work index={1} />
        <Work index={2} />
        <ContactForm />
      </section>
    </>
  );
}
