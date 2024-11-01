import { Coffee, Clock, MapPin } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <div
        className="container-fluid bg-dark text-white py-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/api/placeholder/1200/600")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
      >
        <div className="container d-flex align-items-center min-vh-75 py-5">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">
                Bem-vindo ao Café & Aroma
              </h1>
              <p className="lead mb-4">
                Desperte seus sentidos com o melhor café da cidade. Um ambiente
                acolhedor para momentos especiais.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-25 rounded-circle p-3 d-inline-block mb-3">
                  <Coffee size={32} className="text-warning" />
                </div>
                <h4>Café Premium</h4>
                <p className="text-muted">
                  Grãos selecionados e torrados artesanalmente para um sabor
                  único.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-25 rounded-circle p-3 d-inline-block mb-3">
                  <Clock size={32} className="text-warning" />
                </div>
                <h4>Horário Especial</h4>
                <p className="text-muted">
                  Segunda a Sábado: 7h às 22h
                  <br />
                  Domingo: 8h às 20h
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-25 rounded-circle p-3 d-inline-block mb-3">
                  <MapPin size={32} className="text-warning" />
                </div>
                <h4>Localização</h4>
                <p className="text-muted">
                  Rua do Café, 123
                  <br />
                  Centro - Sua Cidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4">
        <div className="container text-center">
          <small>© 2024 Café & Aroma. Todos os direitos reservados.</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
