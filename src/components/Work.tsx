import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import neony from "../images/neony.webp";
import potisky from "../images/potisky.webp";
import samolepky from "../images/samolepky.webp";

interface WorkProps {
  index: number;
}

export default function Work(props: WorkProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const texts = [
    {
      heading: "Neonová reklama",
      text: "Naše neonové reklamy jsou ručně vyráběné z kvalitních neonových trubic, které dodají vašemu podnikání, domácnosti nebo události jedinečný vzhled. S více než 25 lety zkušeností garantujeme precizní zpracování a design na míru.",
      color: "#ff007f",
      hoverColor: "#ff5733",
      shadow:
        "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
      buttonShadow:
        "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
      textColor: "#000000",
      image: neony,
      id: "neony",
      link: "neony",
    },
    {
      heading: "Potisky na textil",
      text: "Nabízíme profesionální potisky na trička, mikiny a další textil. Možnost tisku barevných obrázků, textů i grafik podle vašeho přání. Používáme kvalitní technologie, včetně DTF tisku, pro trvanlivé a detailní výsledky.",
      color: "#00ffff",
      hoverColor: "#00C5C5FF",
      shadow:
        "0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6)",
      buttonShadow:
        "0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6)",
      textColor: "#000000",
      image: potisky,
      id: "potisky",
      link: "potisky",
    },
    {
      heading: "Řezaná reklama",
      text: "Navrhujeme a realizujeme polepy na auta, vlaky, výlohy i reklamní cedule. Naše polepy jsou nejen estetické, ale také odolné, což zajišťuje jejich dlouhou životnost a atraktivní vzhled pro vaše potřeby.",
      color: "#ffff00",
      hoverColor: "#FFD700FF",
      shadow:
        "0 0 20px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.6)",
      buttonShadow:
        "0 0 20px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.6)",
      textColor: "#000000",
      image: samolepky,
      id: "samolepky",
      link: "polepy",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const handleNavigation = (category: string) => {
    navigate(`/galerie?filter=${category}`);
  };

  return (
    <section
      id={texts[props.index].id}
      ref={sectionRef}
      className={`py-12 px-3 relative mt-8 bg-transparent ${
        isVisible
          ? props.index % 2 === 0
            ? "animate-slide-left"
            : "animate-slide-right"
          : "opacity-0 translate-x-10"
      }`}
    >
      <div
        className="w-full max-w-7xl px-4 py-10 md:px-5 lg:px-5 mx-auto bg-gradient-to-b from-[#090909fb] to-[#090909] rounded-3xl"
        style={{
          borderRadius: "1.5rem",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 15px 25px -5px, rgba(0, 0, 0, 0.3) 5px 20px 30px -10px",
        }}
      >
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto p-3">
          <div
            className={`grid lg:grid-cols-2 grid-cols-1 items-center gap-12 ${
              props.index % 2 === 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`relative w-full h-auto lg:h-full ${
                props.index % 2 === 0 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <img
                className="mx-auto lg:mx-0 h-full rounded-3xl object-cover shadow-lg"
                src={texts[props.index].image}
                alt={texts[props.index].heading}
              />
            </div>
            <div
              className={`relative w-full h-auto lg:h-full ${
                props.index % 2 === 0 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="w-full flex-col justify-start lg:items-start items-center gap-8 flex">
                <h2
                  className="text-4xl font-bold font-manrope lg:text-start text-center"
                  style={{
                    color: texts[props.index].color,
                    textShadow: texts[props.index].shadow,
                    fontFamily: "mexcellent",
                  }}
                >
                  {texts[props.index].heading}
                </h2>
                <p className="text-gray-100 text-lg leading-relaxed lg:text-start text-center">
                  {texts[props.index].text}
                </p>
                <button
                  onClick={() => handleNavigation(texts[props.index].link)}
                  style={{
                    backgroundColor: texts[props.index].color,
                    boxShadow: texts[props.index].buttonShadow,
                  }}
                  className="px-6 py-3 rounded-lg shadow-lg font-medium text-lg transition-all duration-500 text-neutral-800 hover:bg-[custom_hover_color]"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      texts[props.index].hoverColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      texts[props.index].color)
                  }
                >
                  Zjisti více
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
