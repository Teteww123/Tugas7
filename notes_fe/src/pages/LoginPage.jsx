import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Logic untuk autentikasi login
    console.log("Login with", { username, password });
    try {
      const result = await login(username, password); // simpan token ke context & cookie
      if (result) {
        navigate("/notes"); // redirect setelah login
      } else {
        alert("Login failed");
      }

    } catch (error) {
      // Log error untuk debug
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="mt-4 text-center text-sm">
          Belum punya Akun?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Daftar Disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
