import Work from "./Work";
import ContactForm from "./ContactForm";
import aboutUsImage from "../images/aboutus.webp";
import neon from "../images/neon.webp";
import heroBck from "../images/bitmapa.png";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="py-24 bg-gray-900 relative overflow-hidden"
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
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-2 mx-auto mb-20 relative z-10 rounded-3xl">
        <div
          className="grid lg:grid-cols-2 grid-cols-1 items-center gap-12 py-12 px-10 rounded-3xl"
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
          {/* Left Column */}
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

          {/* Right Column */}
          <div className="text-white flex flex-col lg:items-start xl:items-start md:items-center gap-8">
            <h2
              className="text-5xl font-bold leading-snug font-manrope neon-text xl:text-left md:text-center"
              style={{
                textShadow:
                  "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
                color: "#ff007f",
              }}
            >
              Vytváříme reklamy a zábavu na míru
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed text-justify">
              S více než 25 lety zkušeností jsme tu, abychom přetvořili vaše
              nápady v realitu. Od neonových reklam, které oslní, přes
              zakázkovou výrobu obrázků na trička až po polepy na auta a vlaky –
              dáváme vašim vizím život. Jsme pyšní na každý projekt a na důvěru
              našich klientů.
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

      <Work index={0} />
      <Work index={1} />
      <Work index={2} />

      <ContactForm />
    </section>
  );
}
