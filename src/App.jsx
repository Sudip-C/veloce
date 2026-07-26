import { Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Models from "@/pages/Models";
import Configurator from "@/pages/Configurator";
import About from "@/pages/About";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<Models />} />
        <Route path="/configurator" element={<Configurator />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
