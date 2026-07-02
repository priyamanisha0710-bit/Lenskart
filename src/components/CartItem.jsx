import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #f0f0f0" }}>
      <img src={item.image} alt={item.name} style={{ width: "100px", height: "60px", objectFit: "contain", marginRight: "20px" }} />
      
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>{item.brand} - {item.name}</h3>
        <p style={{ color: "#666", fontSize: "14px" }}>Size: {item.size}</p>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "30px" }}>
        <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "5px 10px", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "5px 10px", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>+</button>
      </div>

      <div style={{ width: "100px", fontWeight: "bold" }}>
        ₹{item.price * item.quantity}
      </div>

      <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "16px" }}>
        <FaTrash />
      </button>
    </div>
  );
}

export default CartItem;