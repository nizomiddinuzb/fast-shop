// src/App.tsx

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ProductDetails from "../src/components/ProductList";

interface Products {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

interface Product {
  id: number;
  title: string;
  images: string;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

function ProductList() {
  const [products, setProducts] = useState<Products | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDetails = (id: number) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = (id: number) => {
    if (products) {
      const result: Product[] = products.products.filter(
        (product: Product) => product.id !== id
      );
      setProducts({
        ...products,
        products: result,
      });
    }
  };

  return (
    <div className="container">
    <div className="product-list">
      {products &&
        products.products.map((product: Product) => (
          <div className="product" key={product.id}>
            <h2>{product.title}</h2>
            <img className="product-image" src={product.images} alt={product.title} />
            <div className="button-group">
              <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
              <button className="details-button" onClick={() => handleDetails(product.id)}>Details</button>
            </div>
          </div>
        ))}
    </div>
  </div>
  
  );
}

export default App;
