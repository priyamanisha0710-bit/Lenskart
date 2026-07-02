import { Link } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product, is3DMode }) {
  // If no product is passed, render a generic one to prevent crashing
  const p = product || {
    id: 1,
    brand: "John Jacobs",
    name: "Classic Eyeglasses",
    size: "M",
    rating: 4.5,
    price: 3000,
    oldPrice: 4000,
    discount: 25,
    image: "https://picsum.photos/400/200"
  };

  return (
    <Link to={`/product/${p.id}`} className="product-card" style={{ textDecoration: 'none' }}>
      <div className="card-image-section">
        <div className="badge-row">
          <div className="rating-badge">
            ★ {p.rating}
          </div>
          <FaRegHeart className="heart-icon" />
        </div>
        
        <img src={p.image} alt={p.name} className={`product-image ${is3DMode ? 'effect-3d' : ''}`} />
        
        <div className="image-bottom-row">
          <button className="view-similar-btn" onClick={(e) => e.preventDefault()}>View Similar</button>
          <div className="color-swatches">
            <span className="swatch black"></span>
            <span className="swatch grey"></span>
          </div>
        </div>
      </div>

      <div className="card-details">
        <h3 className="brand-name">{p.brand}</h3>
        <div className="size-badge">
          <span className="size-char">{p.size}</span> Size
        </div>
        
        <div className="price-row">
          <span className="current-price">₹{p.price}</span>
          <span className="old-price">₹{p.oldPrice}</span>
          <span className="discount">({p.discount}% OFF)</span>
        </div>

        <div className="emi-offers">
          ₹{Math.round(p.price/3)} X 3 months | Extra ₹150 off | NO COST EMI
        </div>
        
        <div className="coupon-code">
          ✓ Use code <strong>SINGLE</strong> for this price
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;