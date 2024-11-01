import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Coffee,
  Users,
  Truck,
  ShoppingBag,
  Package,
  Menu,
  X,
} from "lucide-react";

import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg py-3 shadow-sm sticky-top"
        style={{ backgroundColor: "#2C1810" }}
      >
        <div className="container">
          {/* Logo */}
          <Link
            className="navbar-brand d-flex align-items-center text-white"
            to="/"
          >
            <Coffee className="me-2" size={28} />
            <span className="fw-bold">Café & Aroma</span>
          </Link>

          {/* Botão Toggle Mobile */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: "#E6BC8B" }}
          >
            {isOpen ? (
              <X className="text-white" size={24} />
            ) : (
              <Menu className="text-white" size={24} />
            )}
          </button>

          {/* Links de Navegação */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 py-2 me-1 rounded-3 d-flex align-items-center ${
                    location.pathname === "/"
                      ? "active bg-white bg-opacity-10"
                      : "text-white"
                  }`}
                  to="/"
                >
                  <ShoppingBag size={18} className="me-2" />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 py-2 me-1 rounded-3 d-flex align-items-center ${
                    location.pathname === "/clientes"
                      ? "active bg-white bg-opacity-10"
                      : "text-white"
                  }`}
                  to="/clientes"
                >
                  <Users size={18} className="me-2" />
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 py-2 me-1 rounded-3 d-flex align-items-center ${
                    location.pathname === "/fornecedores"
                      ? "active bg-white bg-opacity-10"
                      : "text-white"
                  }`}
                  to="/fornecedores"
                >
                  <Truck size={18} className="me-2" />
                  Fornecedores
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 py-2 me-1 rounded-3 d-flex align-items-center ${
                    location.pathname === "/pedidos"
                      ? "active bg-white bg-opacity-10"
                      : "text-white"
                  }`}
                  to="/pedidos"
                >
                  <ShoppingBag size={18} className="me-2" />
                  Pedidos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 py-2 me-1 rounded-3 d-flex align-items-center ${
                    location.pathname === "/produtos"
                      ? "active bg-white bg-opacity-10"
                      : "text-white"
                  }`}
                  to="/produtos"
                >
                  <Package size={18} className="me-2" />
                  Produtos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
