import { useEffect, useState } from "react";
import { Box, PenLine, Trash2, PlusCircle } from "lucide-react";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  // Estado para formulário
  const [formData, setFormData] = useState({
    dataEmissao: "",
    valorTotal: "",
    clienteId: "",
    produtoId: "",
  });

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
    fetchProdutos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Pedidos");
      const pedidosData = await response.json();

      // Obtém os clientes e produtos relacionados aos pedidos
      const pedidosComDetalhes = await Promise.all(
        pedidosData.map(async (pedido) => {
          const clienteResponse = await fetch(
            `https://localhost:7082/api/Clientes/${pedido.clienteId}`
          );
          const clienteData = await clienteResponse.json();

          const produtoResponse = await fetch(
            `https://localhost:7082/api/Produtos/${pedido.produtoId}`
          );
          const produtoData = await produtoResponse.json();

          return {
            ...pedido,
            clienteNome: clienteData.nome,
            produtoNome: produtoData.nome,
          };
        })
      );

      setPedidos(pedidosComDetalhes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchClientes = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Clientes");
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch("https://localhost:7082/api/Produtos");
      const data = await response.json();
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
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
      const response = await fetch("https://localhost:7082/api/Pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowCreateModal(false);
        fetchPedidos();
        setFormData({
          dataEmissao: "",
          valorTotal: "",
          clienteId: "",
          produtoId: "",
        });
      }
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário antes de enviar:", formData); // Adicione esta linha

    // Inclua o id e mantenha a dataEmissao
    const { dataEmissao, ...data } = formData; // Desestrutura os dados, mantendo a dataEmissao

    // Adicione o ID ao objeto data que será enviado
    data.id = selectedPedido.id; // Use o ID do pedido selecionado

    // Use a dataEmissao do pedido selecionado
    data.dataEmissao = selectedPedido.dataEmissao; // Mantenha a data de emissão atual do pedido selecionado

    try {
      const response = await fetch(
        `https://localhost:7082/api/Pedidos/${selectedPedido.id}`, // Use o ID do pedido selecionado na URL
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Envie todos os dados, incluindo o id e a dataEmissao
        }
      );

      console.log("Resposta da API:", response); // Adicione esta linha para verificar a resposta

      if (response.ok) {
        setShowEditModal(false);
        fetchPedidos(); // Recarregue os pedidos
      } else {
        const errorData = await response.json();
        console.error("Erro na resposta da API:", errorData); // Verifique a resposta de erro
      }
    } catch (err) {
      console.error("Erro ao editar pedido:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://localhost:7082/api/Pedidos/${selectedPedido.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setShowDeleteModal(false);
        fetchPedidos();
      }
    } catch (err) {
      console.error("Erro ao excluir pedido:", err);
    }
  };

  const openEditModal = (pedido) => {
    setSelectedPedido(pedido);
    setFormData({
      dataEmissao: pedido.dataEmissao,
      valorTotal: pedido.valorTotal,
      clienteId: pedido.clienteId,
      produtoId: pedido.produtoId,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (pedido) => {
    setSelectedPedido(pedido);
    setShowDeleteModal(true);
  };

  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.id.toString().includes(searchTerm)
  );

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3 text-brown d-flex align-items-center justify-content-center gap-2">
            <Box className="text-secondary" />
            Pedidos
          </h1>
          <p className="text-secondary lead">Gerenciamento de pedidos</p>
        </div>

        {/* Search Bar e Botão Adicionar */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button
                  className="btn btn-warning"
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusCircle size={18} className="me-2" />
                  Novo Pedido
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Pedidos */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredPedidos.map((pedido) => (
            <div key={pedido.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-0">Pedido #{pedido.id}</h5>
                  <div className="card-text">
                    <div className="mb-2">
                      <strong>Data de Emissão:</strong>{" "}
                      {new Date(pedido.dataEmissao).toLocaleDateString()}
                    </div>
                    <div className="mb-2">
                      <strong>Valor Total:</strong> R${" "}
                      {pedido.valorTotal.toFixed(2)}
                    </div>
                    <div className="mb-2">
                      <strong>Cliente:</strong>{" "}
                      {pedido.clienteNome || "Carregando..."}
                    </div>
                    <div className="mb-2">
                      <strong>Produto:</strong>{" "}
                      {pedido.produtoNome || "Carregando..."}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => openEditModal(pedido)}
                      >
                        <PenLine size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => openDeleteModal(pedido)}
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

        {/* Modal Criar Pedido */}
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
                  Novo Pedido
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
                    <label className="form-label">Data de Emissão</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dataEmissao"
                      value={formData.dataEmissao}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Valor Total</label>
                    <input
                      type="number"
                      className="form-control"
                      name="valorTotal"
                      value={formData.valorTotal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select
                      className="form-select"
                      name="clienteId"
                      value={formData.clienteId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione um cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Produto</label>
                    <select
                      className="form-select"
                      name="produtoId"
                      value={formData.produtoId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione um produto</option>
                      {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal Editar Pedido */}
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
                  Editar Pedido
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
                    <label className="form-label">Valor Total</label>
                    <input
                      type="number"
                      className="form-control"
                      name="valorTotal"
                      value={formData.valorTotal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select
                      className="form-select"
                      name="clienteId"
                      value={formData.clienteId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione um cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Produto</label>
                    <select
                      className="form-select"
                      name="produtoId"
                      value={formData.produtoId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione um produto</option>
                      {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
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

        {/* Modal Excluir Pedido */}
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
                  Excluir Pedido
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza de que deseja excluir o pedido #
                  {selectedPedido?.id}?
                </p>
                <p className="text-muted">Esta ação não pode ser desfeita.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
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

        {/* ... */}
      </div>
    </div>
  );
};

export default Pedidos;
