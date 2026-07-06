import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import "./Cart.css";

function Cart() {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="cart-page-wrapper">
      <Navbar />

      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <p>Add some amazing eyewear to your cart!</p>
              <Link to="/products">Continue Shopping</Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.cartItemId} item={item} />
              ))}

              <div className="cart-summary">
                <h3 className="cart-total">
                  <span>Total Price:</span> 
                  <span>₹{totalPrice}</span>
                </h3>
                <button 
                  className="cart-checkout-btn"
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