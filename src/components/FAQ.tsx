import { useState } from "react";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Jak probíhá výroba neonových reklam?",
      answer:
        "Neonové reklamy vyrábíme ručně z kvalitních neonových trubic. Proces zahrnuje návrh na míru, výrobu, montáž a instalaci. Vše je přizpůsobeno vašim potřebám.",
    },
    {
      question: "Jaké technologie používáte pro potisky na textil?",
      answer:
        "Používáme DTF tisky a další profesionální technologie, které zajišťují detailní a trvanlivé výsledky. Můžete si zvolit vlastní design, barvy a texty.",
    },
    {
      question: "Děláte polepy na auta i vlaky?",
      answer:
        "Ano, realizujeme polepy na širokou škálu povrchů, včetně aut, vlaků, výloh a reklamních cedulí. Naše polepy jsou odolné a přizpůsobené vašim požadavkům.",
    },
    {
      question: "Jaká je životnost neonových reklam?",
      answer:
        "Životnost neonových reklam se obvykle pohybuje mezi 8–15 lety, v závislosti na způsobu užívání a údržbě. Nabízíme také servis a opravy.",
    },
    {
      question: "Mohu si objednat design na míru?",
      answer:
        "Ano, veškeré naše produkty lze přizpůsobit vašim specifickým požadavkům. Společně vytvoříme návrh, který splní vaše představy.",
    },
  ];

  return (
    <section className="py-24 bg-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h6 className="text-lg text-[#FF5733] font-medium text-center mb-2">
            Často kladené otázky
          </h6>
          <h2 className="text-4xl font-manrope text-center font-bold text-white leading-[3.25rem]">
            Máte otázky? Máme odpovědi!
          </h2>
        </div>

        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`accordion py-6 px-6 transition-all duration-500 rounded-xl bg-[#161616] mb-2 ${
                activeIndex === index ? "bg-[#1A1A1A]" : ""
              }`}
              style={{
                borderBottom: `3px solid ${
                  activeIndex === index ? "#FF004D" : "#FF2A2A"
                }`,
              }}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between leading-8 w-full transition duration-500 text-left"
                onClick={() => toggleAccordion(index)}
                aria-controls={`collapse-${index}`}
                style={{
                  color: activeIndex === index ? "#FF5733" : "#FF4136", // Different neon red shades for open/closed
                  textShadow:
                    activeIndex === index
                      ? "0 0 8px #FF5733" // Glow for active text
                      : "0 0 5px #FF4136", // Glow for closed text
                }}
              >
                <h5 className="text-lg font-medium hover:text-[#ff6847]">
                  {faq.question}
                </h5>
                <svg
                  className={`transition duration-500 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: activeIndex === index ? "#FF004D" : "#FF2A2A",
                    filter:
                      activeIndex === index
                        ? "drop-shadow(0 0 8px #FF004D)"
                        : "drop-shadow(0 0 5px #FF2A2A)", // Glow for the SVG arrow
                  }}
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                id={`collapse-${index}`}
                className="accordion-content w-full px-0 overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: activeIndex === index ? "250px" : "0",
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <p className="text-base text-gray-300 leading-6 mt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
