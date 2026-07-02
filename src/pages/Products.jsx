import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import { productsData } from "../data/products";
import "./ProductsLayout.css";

function Products() {
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState({ gender: [], brand: [], shape: [] });
  const [sortOrder, setSortOrder] = useState("Recommended");
  const [is3DMode, setIs3DMode] = useState(false);
  
  // Use location to get query params (e.g. ?type=sunglasses)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filterType = searchParams.get("type"); // "eyeglasses" or "sunglasses"

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtering Logic
  let processedProducts = productsData;

  // 0. URL Query Filter (Eyeglasses vs Sunglasses)
  if (filterType) {
    processedProducts = processedProducts.filter(p => p.type === filterType);
  }

  // 1. Tab Filter
  if (activeTab !== "All") {
    processedProducts = processedProducts.filter(p => p.category === activeTab);
  }

  // 2. Sidebar Filters (Gender, Brand, Shape)
  if (filters.gender.length > 0) {
    processedProducts = processedProducts.filter(p => filters.gender.includes(p.gender));
  }
  if (filters.brand.length > 0) {
    processedProducts = processedProducts.filter(p => filters.brand.includes(p.brand));
  }
  if (filters.shape.length > 0) {
    processedProducts = processedProducts.filter(p => filters.shape.includes(p.shape));
  }

  // 3. Sorting
  if (sortOrder === "Price: Low to High") {
    processedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "Price: High to Low") {
    processedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="main-layout">
        <aside className="sidebar">
          <Filter 
            filters={filters} 
            onApplyFilters={handleApplyFilters} 
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onTry3dToggle={setIs3DMode}
          />
        </aside>

        <section className="product-area">
          <div className="tabs">
            <button className={activeTab === "All" ? "tab active" : "tab"} onClick={() => setActiveTab("All")}>
              All
            </button>
            <button className={activeTab === "Classic" ? "tab active" : "tab"} onClick={() => setActiveTab("Classic")}>
               Classic
            </button>
            <button className={activeTab === "Premium" ? "tab active" : "tab"} onClick={() => setActiveTab("Premium")}>
               Premium
            </button>
          </div>

          <div className="products-grid">
            {processedProducts.length === 0 ? (
              <div style={{ padding: '40px', width: '100%', textAlign: 'center', color: '#666' }}>
                <h3>No products match your filters.</h3>
              </div>
            ) : (
              processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} is3DMode={is3DMode} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Products;