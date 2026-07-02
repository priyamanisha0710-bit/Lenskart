import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Wishlist() {
  return (
    <>
      <Navbar />

      <div className="container">

        <h1 style={{ margin: "30px 0" }}>
          My Wishlist
        </h1>

        <ProductCard />

      </div>

      <Footer />
    </>
  );
}

export default Wishlist;