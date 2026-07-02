import { useState } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Checkout.css";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("gpay");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Simulate order placement
    clearCart();
    window.location.href = "/order-confirmed";
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            
            <section className="checkout-section">
              <h2>1. Shipping Address</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" required placeholder="9876543210" pattern="[0-9]{10}" />
              </div>
              <div className="form-group">
                <label>Address Line</label>
                <input type="text" required placeholder="123 Street Name, Apartment" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" required placeholder="Chennai" />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" required placeholder="600001" pattern="[0-9]{6}" />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2>2. Payment Method</h2>
              
              <label className={`payment-option ${paymentMethod === 'gpay' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="gpay" 
                  checked={paymentMethod === "gpay"}
                  onChange={() => setPaymentMethod("gpay")}
                />
                <span className="payment-label">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style={{ height: '20px', marginRight: '10px' }} />
                  Google Pay (UPI)
                </span>
              </label>

              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="payment-label">
                  Cash on Delivery (COD)
                </span>
              </label>

              <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span className="payment-label">
                  Credit / Debit Card
                </span>
              </label>

            </section>

            <button type="submit" className="place-order-btn">Place Order</button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item, index) => (
                <div className="summary-item" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: 'green' }}>FREE</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;