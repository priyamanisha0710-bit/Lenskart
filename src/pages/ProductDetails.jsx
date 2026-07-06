import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { productsData } from "../data/products";
import { useCart } from "../context/CartContext";
import SelectLensesModal from "../components/SelectLensesModal";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'cart' or 'buy'

  const [activeIndex, setActiveIndex] = useState(0);
  const filters = ['', 'grayscale(100%)', 'sepia(100%)'];

  if (!product) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Product Not Found</h2>
          <Link to="/products" style={{ color: 'var(--teal)' }}>Return to Shop</Link>
        </div>
      </div>
    );
  }

  // Determine if product needs lenses (only eyeglasses or products without explicit type acting as frames)
  const needsLenses = product.type === 'eyeglasses' || !product.type;

  const handleInitialAction = (action) => {
    navigate(`/select-lenses/${product.id}?action=${action}`);
  };

  const executeAction = (action, lensData) => {
    addToCart(product);

    if (action === 'buy') {
      navigate('/checkout');
    } else {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="container details-container">
        <div className="details-layout">
          
          {/* Left Side: Product Image */}
          <div className="image-column">
            <div className="main-image-container">
               <img src={product.image} alt={product.name} className="details-image" style={{ filter: filters[activeIndex] }} />
               <div className="try-on-badge">Try On in 3D</div>
            </div>
            
            <div className="thumbnail-row">
              {filters.map((filterStyle, index) => (
                <img 
                  key={index}
                  src={product.image} 
                  alt={`Thumb ${index + 1}`} 
                  className={`thumb ${activeIndex === index ? 'active' : ''}`} 
                  style={{ filter: filterStyle, cursor: 'pointer' }} 
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="info-column">
            <h1 className="details-brand">{product.brand}</h1>
            <h2 className="details-name">{product.name}</h2>
            <p className="details-size">Size: {product.size} • <span className="details-rating">★ {product.rating}</span></p>

            <div className="details-price-box">
              <span className="details-price">₹{product.price}</span>
              <span className="details-old-price">₹{product.oldPrice}</span>
              <span className="details-discount">({product.discount}% OFF)</span>
            </div>

            <div className="details-offers">
              <p>✓ Buy 1 Get 1 Free with Gold Membership</p>
              <p>✓ ₹{Math.round(product.price/3)} X 3 months | NO COST EMI</p>
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="color-options">
              <h3>Available Colors:</h3>
              <div className="swatch-list">
                {product.colors.map((color, index) => (
                  <span key={index} className={`big-swatch ${color}`}></span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleInitialAction('cart')}
                style={{ backgroundColor: '#003b6d', flex: 1, fontSize: '15px' }}
              >
                Select Lenses & Add to Cart
              </button>

              <button 
                className="add-to-cart-btn buy-now-btn" 
                onClick={() => handleInitialAction('buy')}
                style={{ backgroundColor: '#003b6d', flex: 1 }}
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;