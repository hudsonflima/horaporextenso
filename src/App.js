import "./styles.css";
import HoraExtenso from "./components/HoraExtenso";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App bg-slate-200">
      <Header />
      <HoraExtenso />
      <Footer />
    </div>
  );
}
