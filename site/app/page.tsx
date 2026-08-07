import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Manifesto from "@/components/Manifesto";
import Archive from "@/components/Archive";
import Chapters from "@/components/Chapters";
import Transmission from "@/components/Transmission";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Nav />
      <Hero />
      <Ticker />
      <Manifesto />
      <Archive />
      <Chapters />
      <Transmission />
      <Footer />
    </main>
  );
}
