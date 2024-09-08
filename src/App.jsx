import { BrowserRouter, Routes, Route } from "react-router-dom";
import YoutubePage from "./pages/youtube";
import TiktokPage from "./pages/tiktok";
import Navbar from "./components/Navbar";
import InstagramPage from "./pages/instagram";
import TwitterPage from "./pages/twitter";
import FacebookPage from "./pages/facebook";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>    
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content area should grow to fill space */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<TiktokPage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/instagram" element={<InstagramPage />} />
          <Route path="/twitter" element={<TwitterPage />} />
          <Route path="/facebook" element={<FacebookPage />} />
        </Routes>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
