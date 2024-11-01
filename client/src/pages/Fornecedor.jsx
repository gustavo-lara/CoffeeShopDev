import { useEffect, useState } from "react";
import {
  Coffee,
  Search,
  User,
  Phone,
  Mail,
  CreditCard,
  PenLine,
  Trash2,
  UserPlus,
} from "lucide-react";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  // Estado para formulário
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    endereco: "",
    telefone: "",
  });

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Fornecedores");
      const data = await response.json();
      setFornecedores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7082/api/Fornecedores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowCreateModal(false);
        fetchFornecedores();
        setFormData({
          nome: "",
          cnpj: "",
          email: "",
          endereco: "",
          telefone: "",
        });
      }
    } catch (err) {
      console.error("Erro ao criar fornecedor:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7082/api/Fornecedores/${selectedFornecedor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setShowEditModal(false);
        fetchFornecedores();
      }
    } catch (err) {
      console.error("Erro ao editar fornecedor:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://localhost:7082/api/Fornecedores/${selectedFornecedor.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setShowDeleteModal(false);
        fetchFornecedores();
      }
    } catch (err) {
      console.error("Erro ao excluir fornecedor:", err);
    }
  };

  const openEditModal = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setFormData(fornecedor);
    setShowEditModal(true);
  };

  const openDeleteModal = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setShowDeleteModal(true);
  };

  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3 text-brown d-flex align-items-center justify-content-center gap-2">
            <Coffee className="text-secondary" />
            Nossos Fornecedores
          </h1>
          <p className="text-secondary lead">
            Gerenciamento de fornecedores da nossa cafeteria
          </p>
        </div>

        {/* Search Bar e Botão Adicionar */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search className="text-secondary" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar fornecedores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button
                  className="btn btn-warning"
                  onClick={() => setShowCreateModal(true)}
                >
                  <UserPlus size={18} className="me-2" />
                  Novo Fornecedor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fornecedores Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredFornecedores.map((fornecedor) => (
            <div key={fornecedor.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-2">
                      <User className="text-secondary" />
                    </div>
                    <h5 className="card-title mb-0">{fornecedor.nome}</h5>
                  </div>

                  <div className="card-text">
                    <div className="mb-2 d-flex align-items-center">
                      <CreditCard className="text-secondary me-2" size={18} />
                      <small>{fornecedor.cnpj}</small>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <Mail className="text-secondary me-2" size={18} />
                      <small>{fornecedor.email}</small>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <Phone className="text-secondary me-2" size={18} />
                      <small>{fornecedor.telefone}</small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => openEditModal(fornecedor)}
                      >
                        <PenLine size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => openDeleteModal(fornecedor)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Criar Fornecedor */}
        <div
          className={`modal fade ${showCreateModal ? "show" : ""}`}
          style={{ display: showCreateModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning bg-opacity-10">
                <h5 className="modal-title">
                  <UserPlus className="me-2" />
                  Novo Fornecedor
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CNPJ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Endereço</label>
                    <input
                      type="text"
                      className="form-control"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Adicionar Fornecedor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Editar Fornecedor */}
        <div
          className={`modal fade ${showEditModal ? "show" : ""}`}
          style={{ display: showEditModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning bg-opacity-10">
                <h5 className="modal-title">
                  <User className="me-2" />
                  Editar Fornecedor
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <form onSubmit={handleEdit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">CNPJ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Endereço</label>
                    <input
                      type="text"
                      className="form-control"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Atualizar Fornecedor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Deletar Fornecedor */}
        <div
          className={`modal fade ${showDeleteModal ? "show" : ""}`}
          style={{ display: showDeleteModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger bg-opacity-10">
                <h5 className="modal-title">Deletar Fornecedor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Tem certeza que deseja excluir o fornecedor{" "}
                <strong>{selectedFornecedor?.nome}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading e Error Handling */}
        {/* {loading && <div className="text-center">Carregando...</div>}
        {error && <div className="text-danger text-center"></div>} */}
      </div>
    </div>
  );
};

export default Fornecedores;
