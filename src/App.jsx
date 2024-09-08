import { BrowserRouter, Routes, Route } from "react-router-dom";
import YoutubePage from "./pages/youtube";
import TiktokPage from "./pages/tiktok";
import Navbar from "./components/Navbar";

const app = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/tiktok" element={<TiktokPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default app;