import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string, sectionId?: string) => {
    if (path === "/galerie") {
      // Navigace přímo na stránku Galerie
      navigate(path);
    } else {
      // Navigace na hlavní stránku a posun na sekci
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Krátká prodleva pro načtení stránky
      }
    }
  };

  return (
    <footer className="bg-gradient-to-t from-[#111111] to-[#161616] text-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#FF007F] mb-4">O nás</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Specializujeme se na výrobu neonových reklam, potisky na textil a
              řezanou reklamu. S více než 25 lety zkušeností nabízíme špičkové
              produkty a individuální přístup k zákazníkům.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#FF007F] mb-4">
              Navigace
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation("/", "home")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="Domů"
                >
                  Domů
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "about-us")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="O nás"
                >
                  O nás
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "neony")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="Neony"
                >
                  Neony
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "potisky")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="Potisky"
                >
                  Potisky
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "samolepky")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="Samolepky"
                >
                  Samolepky
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/galerie")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="Galerie"
                >
                  Galerie
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "kontakt")}
                  className="hover:text-[#FF5733] text-left"
                  aria-label="Kontaktujte nás"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#FF007F] mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#FF007F] text-lg" />
                <span>neonar@seznam.cz</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-[#FF007F] text-lg" />
                <span>+420 777 034 364</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.facebook.com/petrjiri.brejsa"
                className="p-3 bg-gray-800 rounded-full hover:bg-[#FF007F] transition"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a
                href="https://www.instagram.com/oas_neon/"
                className="p-3 bg-gray-800 rounded-full hover:bg-[#FF007F] transition"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>
            © 2025 <span className="text-[#FF007F]">OAS-NEON</span>. Všechna
            práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
