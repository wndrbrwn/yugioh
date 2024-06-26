import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Mint from "./pages/Mint";
import My from "./pages/My";
import SaleNft from "./pages/Sale";
import Slot from "./pages/Slot";
import Card from "./pages/Card";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/my" element={<My />} />
          <Route path="/sale" element={<SaleNft />} />
          <Route path="/card" element={<Card />} />
          <Route path="/slot" element={<Slot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;