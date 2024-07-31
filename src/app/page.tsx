import Header from "./components/Header";
import Footer from "./components/Footer";
import HoraExtenso from "./components/HoraExtenso";

export default function Home() {
  return (
    <div className="bg-slate-200">
      <Header />
      <HoraExtenso />
      <Footer />
    </div>
  );
}
