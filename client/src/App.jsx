import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Header from "./components/Header/Header.jsx";
import Cliente from "./pages/Cliente.jsx";
import Fornecedores from "./pages/Fornecedor.jsx";
import Produtos from "./pages/Produtos.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
