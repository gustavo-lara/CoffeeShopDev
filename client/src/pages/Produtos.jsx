import { useEffect, useState } from "react";
import {
  Box,
  Search,
  Tag,
  DollarSign,
  Layers,
  PenLine,
  Trash2,
  PlusCircle,
} from "lucide-react";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  // Estado para formulário
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidadeEstoque: "",
    fornecedorId: "",
  });

  useEffect(() => {
    fetchProdutos();
    fetchFornecedores();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Produtos");
      const data = await response.json();
      setProdutos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFornecedores = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Fornecedores");
      const data = await response.json();
      setFornecedores(data);
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
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
      const response = await fetch("https://localhost:7082/api/Produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowCreateModal(false);
        fetchProdutos();
        setFormData({
          nome: "",
          descricao: "",
          preco: "",
          quantidadeEstoque: "",
          fornecedorId: "",
        });
      }
    } catch (err) {
      console.error("Erro ao criar produto:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7082/api/Produtos/${selectedProduto.id}`,
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
        fetchProdutos();
      }
    } catch (err) {
      console.error("Erro ao editar produto:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://localhost:7082/api/Produtos/${selectedProduto.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setShowDeleteModal(false);
        fetchProdutos();
      }
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
    }
  };

  const openEditModal = (produto) => {
    setSelectedProduto(produto);
    setFormData(produto);
    setShowEditModal(true);
  };

  const openDeleteModal = (produto) => {
    setSelectedProduto(produto);
    setShowDeleteModal(true);
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3 text-brown d-flex align-items-center justify-content-center gap-2">
            <Box className="text-secondary" />
            Nossos Produtos
          </h1>
          <p className="text-secondary lead">
            Gerenciamento de produtos da nossa cafeteria
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
                    placeholder="Buscar produtos..."
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
                  <PlusCircle size={18} className="me-2" />
                  Novo Produto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProdutos.map((produto) => (
            <div key={produto.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-0">{produto.nome}</h5>
                  <div className="card-text">
                    <div className="mb-2 d-flex align-items-center">
                      <Tag className="text-secondary me-2" size={18} />
                      <small>{produto.descricao}</small>
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <DollarSign className="text-secondary me-2" size={18} />
                      <small>{produto.preco}</small>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <Layers className="text-secondary me-2" size={18} />
                      <small>Estoque: {produto.quantidadeEstoque}</small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => openEditModal(produto)}
                      >
                        <PenLine size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => openDeleteModal(produto)}
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

        {/* Modal Criar Produto */}
        <div
          className={`modal fade ${showCreateModal ? "show" : ""}`}
          style={{ display: showCreateModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-warning bg-opacity-10">
                <h5 className="modal-title">
                  <PlusCircle className="me-2" />
                  Novo Produto
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
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Preço</label>
                    <input
                      type="number"
                      className="form-control"
                      name="preco"
                      value={formData.preco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantidade em Estoque</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantidadeEstoque"
                      value={formData.quantidadeEstoque}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fornecedor</label>
                    <select
                      className="form-select"
                      name="fornecedorId"
                      value={formData.fornecedorId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione o fornecedor</option>
                      {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.nome}
                        </option>
                      ))}
                    </select>
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
                    Criar Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Modal Editar Produto */}
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
                  Editar Produto
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
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Preço</label>
                    <input
                      type="number"
                      className="form-control"
                      name="preco"
                      value={formData.preco}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantidade em Estoque</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantidadeEstoque"
                      value={formData.quantidadeEstoque}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fornecedor</label>
                    <select
                      className="form-select"
                      name="fornecedorId"
                      value={formData.fornecedorId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione o fornecedor</option>
                      {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>
                          {fornecedor.nome}
                        </option>
                      ))}
                    </select>
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
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Excluir Produto */}
        <div
          className={`modal fade ${showDeleteModal ? "show" : ""}`}
          style={{ display: showDeleteModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger bg-opacity-10">
                <h5 className="modal-title text-danger">
                  <Trash2 className="me-2" />
                  Excluir Produto
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza de que deseja excluir o produto{" "}
                  <strong>{selectedProduto?.nome}</strong>?
                </p>
                <p className="text-muted">Essa ação não pode ser desfeita.</p>
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
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
