import { Link } from "react-router-dom";
import { FaSearch, FaRegHeart, FaShoppingBag, FaRegUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar dark-navbar">
      <div className="nav-left">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: '#fff', gap: '8px' }}>
          {/* Using a generic infinity-like Lenskart logo mockup */}
          <svg width="40" height="20" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 25C25 15 35 15 35 25C35 35 25 35 25 25Z" stroke="#ffffff" strokeWidth="6"/>
            <path d="M75 25C75 15 65 15 65 25C65 35 75 35 75 25Z" stroke="#ffffff" strokeWidth="6"/>
            <path d="M35 25H65" stroke="#ffffff" strokeWidth="6"/>
          </svg>
          <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '1px' }}>LENSKART</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/products?type=eyeglasses">EYEGLASSES</Link></li>
          <li><Link to="/products?type=sunglasses">SUNGLASSES</Link></li>
          <li><Link to="/products?type=contacts">CONTACTS</Link></li>
          <li><Link to="/">STORES</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder='Search "unbreakable glasses for kids"' />
        </div>
        <div className="nav-icons">
          <FaRegHeart />
          <Link to="/cart" style={{ position: "relative" }}>
            <FaShoppingBag />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
          <Link to="/login"><FaRegUser /></Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;