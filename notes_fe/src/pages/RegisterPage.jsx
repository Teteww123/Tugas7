import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // untuk navigasi programatik
import axios from "axios";
import { BASE_URL } from "../utils/utils.js";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // untuk navigasi setelah registrasi berhasil

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi password
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match!");
      return;
    }
    // Logic untuk registrasi (misalnya API call)
    console.log("Register with", { username, password, confirmPassword });
    try {
      const response = await axios.post(`${BASE_URL}/register`,
        {
          username,
          password,
          confirm_password: confirmPassword
        },
        {
          headers: {
            "Content-Type": "application/json", // Pastikan headernya benar
          },
        }
      );
      if (response.data.data) {
        console.log(response.data.data);
        // Setelah registrasi berhasil, navigasi ke halaman login
        navigate("/login"); // Ganti '/login' dengan halaman login
      }
    } catch (error) {
      alert(error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Sudah Punya Akun?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login Disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
