import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Import react-hot-toast

interface Product {
  id: number;
  title: string;
  images: string;
  price: number;
}

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showTodo, setShowTodo] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    if (product) {
      const cartItem = {
        productId: product.id,
        title: product.title,
        quantity: quantity,
        price: product.price,
        image: product.images, // Save the product image
      };

      // Save to local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      cartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      setShowTodo(true); // Show the todo div
    }
  };

  const handleConfirm = () => {
    setShowTodo(false); // Hide the todo div
    toast.success("Thanks for shopping!"); // Show toast notification
    alert("Thanks for shopping!"); // Show alert notification
  };

  if (!product) {
    return (
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }

  return (
    <div className="centerga">
      <div className="App">
        <h2>{product.title}</h2>
        <img className="img" src={product.images} alt={product.title} />
        <p>Quantity: {quantity}</p>
        <p>Price: ${product.price}</p>
        <div className="flex">
          <button onClick={handleDecrement}>-</button>
          <h1>{quantity}</h1>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleBuy}>Buy</button>
          <Link to="/"><button className="btn btn-secondary">Back to home</button></Link>
        </div>
      </div>

      {showTodo && (
        <div className="todo">
          <h3>🛒 Your Cart</h3>
          <div className="todo-item">
            <img src={product.images} alt={product.title} className="todo-image" />
            <div>
              <p><strong>{product.title}</strong></p>
              <p>Quantity: {quantity}</p>
              <p>Total: ${product.price * quantity}</p>
              <button className="btn btn-secondary" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
