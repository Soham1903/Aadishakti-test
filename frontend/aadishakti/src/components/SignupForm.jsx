import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, AlertCircle, Moon, Sun, Stars } from "lucide-react";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    gender: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }
    if (!validatePhone(formData.phoneno)) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f9f3f5] flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 text-yellow-500 opacity-30">
          <Sun size={60} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-pink-300 opacity-30">
          <Stars size={40} />
        </div>
        <div className="absolute top-1/4 left-1/4 text-purple-300 opacity-30">
          <Moon size={50} />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex justify-center mb-6">
            <Stars className="text-[#921a40] h-12 w-12" />
          </div>

          <h2 className="text-center text-3xl font-bold text-[#921a40] mb-2">
            Begin Your Journey
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#921a40] hover:text-[#b22550]">
              Log in
            </Link>
          </p>

          {error && (
            <div className="bg-red-200 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-700" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-200 border-l-4 border-green-500 p-4 mb-6 rounded-r">
              <p className="text-sm text-green-700">
                Account created! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921a40] focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
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
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921a40] focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921a40] focus:border-transparent text-gray-900"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#921a40] focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg text-white bg-[#921a40] hover:bg-[#b22550] focus:ring-2 focus:ring-offset-2 focus:ring-[#921a40] focus:ring-offset-[#f9f3f5] transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Start Your Cosmic Journey"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
