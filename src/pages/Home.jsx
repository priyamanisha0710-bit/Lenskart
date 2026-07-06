import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrowseFrames from "../components/BrowseFrames";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { productsData } from "../data/products";
import "./ProductsLayout.css"; // For .products-grid styles
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BrowseFrames />
      <section className="category-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <CategoryCard />
        </div>
      </section>

      <section className="featured-products-section" style={{ padding: '10px 20px 40px 20px', backgroundColor: '#f9f9f9' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', color: 'var(--primary)' }}>Trending Now</h2>
          <div className="products-grid">
            {productsData.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} is3DMode={false} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}

export default Home;