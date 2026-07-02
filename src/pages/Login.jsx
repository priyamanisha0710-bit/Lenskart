import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <div
        style={{
          width: "400px",
          margin: "60px auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
        }}
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#00b7c6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Login
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Login;