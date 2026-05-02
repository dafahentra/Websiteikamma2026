
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  
  // Import logos for animated favicon
  import LogoHitam from "./assets/LogoHitam.svg";
  import ArsanaLogo from "./assets/ArsanaLogo.svg";

  // Animated Favicon logic
  const favicons = [LogoHitam, ArsanaLogo];
  let faviconIndex = 0;
  
  setInterval(() => {
    const link = document.getElementById("favicon") as HTMLLinkElement;
    if (link) {
      link.href = favicons[faviconIndex];
      faviconIndex = (faviconIndex + 1) % favicons.length;
    }
  }, 1000); // Ganti logo setiap 1 detik

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );