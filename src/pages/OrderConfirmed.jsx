import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Checkout.css"; // Reuse some checkout styles if needed

function OrderConfirmed() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit order ID

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }}>✓</div>
          <h1 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Order Confirmed!</h1>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Order Number:</p>
            <p style={{ margin: '5px 0 0', fontSize: '24px', letterSpacing: '2px', color: 'var(--teal)' }}>
              #{orderNumber}
            </p>
          </div>

          <p style={{ color: '#777', marginBottom: '40px' }}>
            We've sent a confirmation email with your order details and tracking information.
          </p>

          <Link to="/products" style={{
            display: 'inline-block',
            padding: '15px 40px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OrderConfirmed;
