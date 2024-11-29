import Navbar from "./Navbar";
import backgroundImage from "../images/bck.webp"; // Correct import path

export default function Header() {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="relative h-screen text-white">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <img
          src={backgroundImage} // Use the imported image
          alt="Výroba reklam a zábavy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold tracking-tight leading-tight sm:text-7xl">
              Reklamy a zábava na míru, které oslní
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-300 sm:text-xl">
              S více než <strong>25 lety zkušeností</strong> nabízíme výrobu
              <strong> neonových reklam</strong>,
              <strong> potisků na textil</strong>, a
              <strong> polepů na auta</strong>. Vaše vize proměníme v realitu s
              precizností a jedinečným stylem.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("kontakt");
                }}
                className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Kontaktujte nás
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("about-us");
                }}
                className="text-sm font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              >
                Zjistěte více <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
