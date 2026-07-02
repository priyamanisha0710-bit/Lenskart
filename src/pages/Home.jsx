import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>

      <Navbar />

      <Hero />

      <section className="category-section">

        <div className="container">

          <h2>Shop by Category</h2>

          <CategoryCard />

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;