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
      <section className="category-section" style={{ marginTop: '0px', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--primary)', marginBottom: '30px', marginTop: '0px', whiteSpace: 'nowrap' }}>Shop by Category</h2>
        </div>
        <div className="container" style={{ marginTop: '5px', marginBottom: '10px' }}>
          <CategoryCard />
        </div>
      </section>

      <section className="featured-products-section" style={{ padding: '10px 20px 40px 20px', backgroundColor: '#f9f9f9' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
            </div>
            <div className="marquee-content">
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
              <span>Trending Now</span>
            </div>
          </div>
          <div className="products-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
            {productsData.slice(0, 6).map((product) => (
              <div key={product.id} style={{ flex: '1 1 300px', maxWidth: '320px' }}>
                <ProductCard product={product} is3DMode={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}

export default Home;