import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

function Cart() {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="container" style={{ maxWidth: "800px", marginTop: "50px", minHeight: "60vh" }}>
        <h1 style={{ marginBottom: "30px", color: "var(--primary)" }}>Shopping Cart</h1>

        <div style={{ background: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <h2>Your cart is empty</h2>
              <p style={{ color: "#666", marginBottom: "20px" }}>Add some amazing eyewear to your cart!</p>
              <Link to="/products" style={{ color: "var(--teal)", textDecoration: "none", fontWeight: "bold" }}>Continue Shopping</Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <div style={{ marginTop: "30px", borderTop: "2px solid #eee", paddingTop: "20px" }}>
                <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Total Price:</span> 
                  <span>₹{totalPrice}</span>
                </h3>
                <button 
                  style={{ width: "100%", padding: "15px", backgroundColor: "var(--teal)", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "20px" }}
                  onClick={() => window.location.href = '/checkout'}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Cart;