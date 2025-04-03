import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, AlertCircle, Moon, Sun, Stars } from "lucide-react";
import { useUser } from "../UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data.user);
      setUser(data.user);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f9f3f5] flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-yellow-500 opacity-30">
          <Sun size={60} />
        </div>
        <div className="absolute top-1/4 right-1/4 text-gray-500 opacity-20">
          <Stars size={40} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-gray-400 opacity-20">
          <Moon size={50} />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-2xl">
          <div className="flex justify-center mb-6">
            <Stars className="text-[#921a40] h-12 w-12" />
          </div>

          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#921a40] hover:text-[#b22550]">
              Sign up
            </Link>
          </p>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-r">
              <p className="text-sm text-green-700">
                Login successful! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921a40] focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921a40] focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-[#921a40]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white bg-[#921a40] hover:bg-[#b22550] focus:ring-2 focus:ring-offset-2 focus:ring-[#921a40] focus:ring-offset-[#f9f3f5] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Enter the Cosmos"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
