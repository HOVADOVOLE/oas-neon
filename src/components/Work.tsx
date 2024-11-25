import neony from "../images/neony.jpg";
import potisky from "../images/potisky.jpg";
import samolepky from "../images/samolepky.png";

interface WorkProps {
  index: number;
}

export default function Work(props: WorkProps) {
  const texts = [
    {
      heading: "Neonová reklama",
      text: "Naše neonové reklamy jsou ručně vyráběné z kvalitních neonových trubic, které dodají vašemu podnikání, domácnosti nebo události jedinečný vzhled. S více než 25 lety zkušeností garantujeme precizní zpracování a design na míru.",
      color: "#ff007f", // Růžová
      shadow:
        "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
      image: neony,
      id: "neony",
    },
    {
      heading: "Potisky na textil",
      text: "Nabízíme profesionální potisky na trička, mikiny a další textil. Možnost tisku barevných obrázků, textů i grafik podle vašeho přání. Používáme kvalitní technologie, včetně DTF tisku, pro trvanlivé a detailní výsledky.",
      color: "#00ffff", // Tyrkysová
      shadow:
        "0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6)",
      image: potisky,
      id: "potisky",
    },
    {
      heading: "Řezaná reklama",
      text: "Navrhujeme a realizujeme polepy na auta, vlaky, výlohy i reklamní cedule. Naše polepy jsou nejen estetické, ale také odolné, což zajišťuje jejich dlouhou životnost a atraktivní vzhled pro vaše potřeby.",
      color: "#ffff00", // Žlutá
      shadow:
        "0 0 20px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.6)",
      image: samolepky,
      id: "samolepky",
    },
  ];

  const image = (index: number) => {
    return (
      <img
        className="mx-auto lg:mx-0 h-full rounded-3xl object-cover shadow-lg"
        src={texts[index].image}
        alt="About Us image"
      />
    );
  };

  const text = (index: number) => {
    const { heading, text, color, shadow } = texts[index];
    return (
      <div className="w-full flex-col justify-start lg:items-start items-center gap-8 flex">
        <h2
          className="text-4xl font-bold font-manrope lg:text-start text-center"
          style={{
            color: color,
            textShadow: shadow,
          }}
        >
          {heading}
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed lg:text-start text-center">
          {text}
        </p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-800 rounded-lg shadow-lg text-white font-medium text-lg transition-all duration-500 text-justify">
          Get Started
        </button>
      </div>
    );
  };

  return (
    <section
      id={texts[props.index].id}
      className="py-12 relative mt-8 bg-gray-900"
    >
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div
          className={`grid lg:grid-cols-2 grid-cols-1 items-center gap-12 ${
            props.index % 2 === 0 ? "lg:grid-cols-2 lg:flex-row-reverse" : ""
          }`}
        >
          {/* Obrázek */}
          <div
            className={`relative w-full h-auto lg:h-full ${
              props.index % 2 === 0 ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {image(props.index)}
          </div>
          {/* Text */}
          <div
            className={`relative w-full h-auto lg:h-full ${
              props.index % 2 === 0 ? "lg:order-1" : "lg:order-2"
            }`}
          >
            {text(props.index)}
          </div>
        </div>
      </div>
    </section>
  );
}
