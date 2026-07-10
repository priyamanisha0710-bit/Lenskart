import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product, is3DMode }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

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

  const isSaved = isInWishlist(p.id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    toggleWishlist(p);
  };
  
  return (
    <Link to={`/product/${p.id}`} className="product-card" style={{ textDecoration: 'none' }}>
      <div className="card-image-section">
        <div className="badge-row">
          <div className="rating-badge">
            ★ {p.rating}
          </div>
          <div onClick={handleHeartClick} style={{ cursor: 'pointer', zIndex: 10 }}>
            {isSaved ? <FaHeart color="#ff4d4f" className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
          </div>
        </div>
        
        <img src={p.image} alt={p.name} className={`product-image ${is3DMode ? 'effect-3d' : ''}`} />
        
        <div className="image-bottom-row">

          <button className="floating-cart-btn" onClick={(e) => { 
            e.preventDefault(); 
            addToCart(p);
            alert(`${p.name} added to cart!`);
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="card-details">
        <h3 className="brand-name">{p.brand}</h3>
        <h4 className="product-name">{p.name}</h4>
        
        <div className="tags-row">
          <span className="tag-pill">{p.gender}</span>
          <span className="tag-pill">{p.shape}</span>
          <div className="size-badge" style={{ marginBottom: 0 }}>
            <span className="size-char">{p.size}</span> Size
          </div>
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

