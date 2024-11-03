import { useEffect, useState } from "react";
import { Box, Search, PlusCircle } from "lucide-react";

const Pedidos = ({ produtos }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProduct = (produto) => {
    setSelectedProducts((prev) => {
      const existingProduct = prev.find((item) => item.id === produto.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição para criar o pedido com selectedProducts
    console.log("Produtos selecionados para o pedido:", selectedProducts);
  };

  const filteredProducts = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <h1 className="text-center">Criar Pedido</h1>

        {/* Search Bar */}
        <div className="mb-4">
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

        {/* Produtos Disponíveis */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProducts.map((produto) => (
            <div key={produto.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-0">{produto.nome}</h5>
                  <p>{produto.descricao}</p>
                  <p>Preço: {produto.preco}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleAddProduct(produto)}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Produtos Selecionados */}
        <h2 className="mt-5">Produtos Selecionados</h2>
        <ul className="list-group mb-4">
          {selectedProducts.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.nome} - {item.quantidade} unidades
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveProduct(item.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        {/* Botão para Enviar o Pedido */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Criar Pedido
        </button>
      </div>
    </div>
  );
};

export default Pedidos;
