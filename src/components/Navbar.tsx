import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.webp";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Domů", id: "", color: "#FF1493", isExternal: true },
    { name: "O Nás", id: "about-us", color: "#FF0000" },
    { name: "Neony", id: "neony", color: "#00FF00" },
    { name: "Potisky", id: "potisky", color: "#FF4500" },
    { name: "Samolepky", id: "samolepky", color: "#FFD700" },
    { name: "Galerie", id: "galerie", color: "#00BFFF", isExternal: true },
    { name: "Kontakt", id: "kontakt", color: "#FF69B4" },
  ];

  const handleScroll = async (id: string) => {
    if (location.pathname !== "/") {
      // Přesměrování na domovskou stránku
      await navigate("/");

      // Po přesměrování počkáme na renderování stránky
      setTimeout(() => {
        if (id) {
          const section = document.getElementById(id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
    } else if (id) {
      // Scroll na sekci na aktuální stránce
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-4 py-3 lg:px-8 bg-gray-900/40 backdrop-blur-lg"
      >
        {/* Logo */}
        <div className="flex items-center">
          <a
            onClick={(e) => {
              e.preventDefault();
              handleScroll("");
            }}
            className="-m-1.5 p-1.5 cursor-pointer"
          >
            <span className="sr-only">OAS-NEON</span>
            <img alt="/" src={logo} className="h-12 w-auto" />
          </a>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="absolute inset-x-0 mx-auto hidden lg:flex lg:gap-x-6 justify-center">
          {navigation.map((item) => (
            <a
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                if (!item.isExternal) handleScroll(item.id);
                else navigate(`/${item.id}`);
              }}
              href={item.isExternal ? `/${item.id}` : `#${item.id}`}
              className="text-lg font-semibold text-white relative px-2 cursor-pointer"
              style={{
                color: item.color,
                textShadow: `0 0 5px ${item.color}, 0 0 10px ${item.color}, 0 0 20px ${item.color}`,
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              aria-hidden="true"
              className="h-6 w-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-xs sm:ring-1 sm:ring-gray-700">
          <div className="flex items-center justify-between">
            <a
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                handleScroll("");
              }}
              className="-m-1.5 p-1.5 cursor-pointer"
            >
              <span className="sr-only">OAS-NEON</span>
              <img alt="/" src={logo} className="h-10 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="h-6 w-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="divide-y divide-gray-700">
              <div className="space-y-4 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      if (!item.isExternal) handleScroll(item.id);
                    }}
                    href={item.isExternal ? `/${item.id}` : `#${item.id}`}
                    className="block text-base font-semibold text-white hover:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer"
                    style={{
                      color: item.color,
                      textShadow: `0 0 5px ${item.color}, 0 0 10px ${item.color}, 0 0 20px ${item.color}`,
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
