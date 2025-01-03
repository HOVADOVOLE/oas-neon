import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.webp";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Viditelnost navbaru
  const [lastScrollY, setLastScrollY] = useState(0); // Poslední pozice scrollování

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
      setTimeout(() => {
        if (id) {
          const section = document.getElementById(id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      // Posun na vrchol nebo do sekce na domovské stránce
      if (id) {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Sledování scrollování
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-4 py-3 lg:px-8 bg-[#111111] backdrop-blur-lg"
      >
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleScroll("")}
            className="cursor-pointer focus:outline-none z-10"
            aria-label="OAS-NEON"
            style={{
              padding: 0,
              background: "none",
              border: "none",
            }}
          >
            <span className="sr-only">OAS-NEON</span>
            <img alt="logo" src={logo} className="h-12 w-auto block" />
          </button>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="absolute inset-x-0 mx-auto hidden lg:flex lg:gap-x-6 justify-center">
          {navigation.map((item) => (
            <a
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                if (item.name === "Domů") {
                  handleScroll("");
                } else if (!item.isExternal) {
                  handleScroll(item.id);
                } else {
                  navigate(`/${item.id}`);
                }
              }}
              href={item.isExternal ? `/${item.id}` : `#${item.id}`}
              className="text-lg font-semibold text-white relative px-4 py-2 cursor-pointer transition-transform duration-200 hover:scale-105 hover:brightness-150 group"
              style={{
                color: item.color,
                textShadow: `0 0 5px ${item.color}, 0 0 10px ${item.color}, 0 0 20px ${item.color}`,
              }}
              aria-label="Navigation"
            >
              {item.name}
              <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-transparent transition-all duration-300 group-hover:bg-current"></span>
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
              aria-label="OAS-NEON"
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
                      if (item.name === "Domů") {
                        handleScroll("");
                      } else if (item.isExternal) {
                        navigate(`/${item.id}`);
                      } else {
                        handleScroll(item.id);
                      }
                    }}
                    href={item.isExternal ? `/${item.id}` : `#${item.id}`}
                    className="block text-base font-semibold text-white hover:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer"
                    style={{
                      color: item.color,
                      textShadow: `0 0 5px ${item.color}, 0 0 10px ${item.color}, 0 0 20px ${item.color}`,
                    }}
                    aria-label="Navigation"
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
