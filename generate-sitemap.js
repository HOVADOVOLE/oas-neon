import { SitemapStream, streamToPromise } from "sitemap";
import { writeFile } from "fs/promises";

const generateSitemap = async () => {
  try {
    const smStream = new SitemapStream({ hostname: "https://oas-neon.com" });

    // Zde definujete URL vašeho webu
    smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
    smStream.write({ url: "/about-us", changefreq: "weekly", priority: 0.8 });
    smStream.write({ url: "/galerie", changefreq: "weekly", priority: 0.7 });

    smStream.end();

    // Generování souboru
    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
    await writeFile("./public/sitemap.xml", sitemap);

    console.log(
      "✅ Sitemap byla úspěšně vygenerována a uložena do ./public/sitemap.xml"
    );
  } catch (err) {
    console.error("❌ Chyba při generování sitemap:", err);
  }
};

generateSitemap();
