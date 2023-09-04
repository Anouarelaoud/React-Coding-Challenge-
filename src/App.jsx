import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Types from "./pages/Types";
import PokemonType from "./pages/PokemonType";
import PokemonDetails from "./pages/PokemonDetails";
import styles from "./app.module.scss";

export const App = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/types" element={<Types />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/types/:name" element={<PokemonType />} />
          <Route path="*" element={<h3>Error 404 : Page not found !</h3>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
