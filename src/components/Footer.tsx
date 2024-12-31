export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#111111] to-[#161616] text-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-500 mb-4">
              O nás
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Specializujeme se na výrobu neonových reklam, potisky na textil a
              řezanou reklamu. S více než 25 lety zkušeností nabízíme špičkové
              produkty a individuální přístup k zákazníkům.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-500 mb-4">
              Navigace
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-indigo-400"
                  aria-label="Domů"
                >
                  Domů
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-indigo-400"
                  aria-label="Naše služby"
                >
                  Služby
                </a>
              </li>
              <li>
                <a
                  href="#galerie"
                  className="hover:text-indigo-400"
                  aria-label="Naše galerie"
                >
                  Galerie
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-indigo-400"
                  aria-label="Kontaktujte nás"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-500 mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12v1m-4-1v1m8 4v.01M12 8v1m-4-1v1m8 4v.01M4 12v1m8-5v1m4 5v.01M8 12v1m8 4v.01M12 8v1m-4 4v.01"
                  />
                </svg>
                <span>neonar@seznam.cz</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
                <span>+420 777 034 364</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="p-3 bg-gray-800 rounded-full hover:bg-indigo-500 transition"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.94 8.94l-2.47 2.47c-.2.2-.47.2-.67 0l-1.06-1.06a.5.5 0 010-.67l2.47-2.47c.2-.2.47-.2.67 0l1.06 1.06a.5.5 0 010 .67z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 rounded-full hover:bg-indigo-500 transition"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.94 8.94l-2.47 2.47c-.2-.2-.47-.2-.67 0l-1.06-1.06a.5.5 0 010-.67l2.47-2.47c.2-.2.47-.2.67 0l1.06 1.06a.5.5 0 010 .67z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>
            © 2025 <span className="text-indigo-400">OAS-NEON</span>. Všechna
            práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
