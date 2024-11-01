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

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [setLoading] = useState(true);
  const [setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Estado para formulário
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    ativo: true,
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Clientes");
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7082/api/Clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowCreateModal(false);
        fetchClientes();
        setFormData({
          nome: "",
          cpf: "",
          email: "",
          telefone: "",
          ativo: true,
        });
      }
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7082/api/Clientes/${selectedClient.id}`,
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
        fetchClientes();
      }
    } catch (err) {
      console.error("Erro ao editar cliente:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://localhost:7082/api/Clientes/${selectedClient.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setShowDeleteModal(false);
        fetchClientes();
      }
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
    }
  };

  const openEditModal = (cliente) => {
    setSelectedClient(cliente);
    setFormData(cliente);
    setShowEditModal(true);
  };

  const openDeleteModal = (cliente) => {
    setSelectedClient(cliente);
    setShowDeleteModal(true);
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ... (código de loading e error permanece o mesmo)

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3 text-brown d-flex align-items-center justify-content-center gap-2">
            <Coffee className="text-secondary" />
            Nossos Clientes Especiais
          </h1>
          <p className="text-secondary lead">
            Gerenciamento de clientes da nossa cafeteria
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
                    placeholder="Buscar clientes..."
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
                  Novo Cliente
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredClientes.map((cliente) => (
            <div key={cliente.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-2">
                      <User className="text-secondary" />
                    </div>
                    <h5 className="card-title mb-0">{cliente.nome}</h5>
                  </div>

                  <div className="card-text">
                    <div className="mb-2 d-flex align-items-center">
                      <CreditCard className="text-secondary me-2" size={18} />
                      <small>{cliente.cpf}</small>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <Mail className="text-secondary me-2" size={18} />
                      <small>{cliente.email}</small>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <Phone className="text-secondary me-2" size={18} />
                      <small>{cliente.telefone}</small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className={`badge ${
                        cliente.ativo ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {cliente.ativo ? "Ativo" : "Inativo"}
                    </span>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => openEditModal(cliente)}
                      >
                        <PenLine size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => openDeleteModal(cliente)}
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

        {/* Modal Criar Cliente */}
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
                  Novo Cliente
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
                    <label className="form-label">CPF</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cpf"
                      value={formData.cpf}
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
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="ativo"
                      checked={formData.ativo}
                      onChange={handleInputChange}
                      id="ativoCheck"
                    />
                    <label className="form-check-label" htmlFor="ativoCheck">
                      Cliente Ativo
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Salvar Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Editar Cliente */}
        <div
          className={`modal fade ${showEditModal ? "show" : ""}`}
          style={{ display: showEditModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning bg-opacity-10">
                <h5 className="modal-title">
                  <PenLine className="me-2" />
                  Editar Cliente
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
                    <label className="form-label">CPF</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cpf"
                      value={formData.cpf}
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
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="ativo"
                      checked={formData.ativo}
                      onChange={handleInputChange}
                      id="ativoCheckEdit"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="ativoCheckEdit"
                    >
                      Cliente Ativo
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Atualizar Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Excluir Cliente */}
        <div
          className={`modal fade ${showDeleteModal ? "show" : ""}`}
          style={{ display: showDeleteModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <Trash2 className="me-2" />
                  Confirmar Exclusão
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza que deseja excluir o cliente{" "}
                  <strong>{selectedClient?.nome}</strong>?
                </p>
                <p className="text-muted small">
                  Esta ação não pode ser desfeita.
                </p>
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
                  Confirmar Exclusão
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
