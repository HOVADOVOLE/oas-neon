import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";

export default function HomeDetail() {
  return (
    <>
      <Header />
      <Divider />
      <AboutUs />
      <Divider />
      <FAQ />
      <Footer />
    </>
  );
}
