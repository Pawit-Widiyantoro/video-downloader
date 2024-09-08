import { BrowserRouter, Routes, Route } from "react-router-dom";
import YoutubePage from "./pages/youtube";
import TiktokPage from "./pages/tiktok";
import Navbar from "./components/Navbar";
import InstagramPage from "./pages/instagram";
import TwitterPage from "./pages/twitter";
import FacebookPage from "./pages/facebook";
import Footer from "./components/Footer";

const app = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<TiktokPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/twitter" element={<TwitterPage />} />
          <Route path="/facebook" element={<FacebookPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default app;