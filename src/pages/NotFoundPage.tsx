import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  return (
    <section className="bg-[#111111] text-white relative py-24 min-h-screen h-auto">
      <div className=" max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
          <h1
            className="text-6xl font-bold neon-text mb-4"
            style={{
              textShadow:
                "0 0 20px rgba(255, 0, 128, 0.8), 0 0 30px rgba(255, 0, 128, 0.6)",
              color: "#ff007f",
            }}
          >
            404
          </h1>
          <h2 className="text-4xl font-semibold mb-6">
            Stránka nebyla nalezena
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Omlouváme se, ale stránka, kterou hledáte, neexistuje. Můžete se
            vrátit na hlavní stránku nebo pokračovat v objevování.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-[#FF007F] rounded-lg text-lg font-medium hover:bg-[#BF053D] transition"
          >
            Zpět na domovskou stránku
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </section>
  );
};

export default NotFoundPage;
