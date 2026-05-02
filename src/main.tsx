
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  
  // Import logos for animated favicon
  import LogoHitam from "./assets/LogoHitam.svg";
  import LogoPutih from "./assets/LogoPutih.svg";

  // Animated Favicon logic
  const favicons = [LogoHitam, LogoPutih];
  let faviconIndex = 0;
  
  setInterval(() => {
    const link = document.getElementById("favicon") as HTMLLinkElement;
    if (link) {
      link.href = favicons[faviconIndex];
      faviconIndex = (faviconIndex + 1) % favicons.length;
    }
  }, 1500); // Ganti warna setiap 1.5 detik agar tidak terlalu cepat

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );