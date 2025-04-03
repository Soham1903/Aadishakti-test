import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadImage from "./components/Uploadimg";
import CourseForm from "./components/CourseForm";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart.jsx";
import PromoCodeForm from "./components/PromoCodeForm.jsx";
import { UserProvider } from "./UserContext.jsx";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyPage from "./components/BuyPage.jsx";
import CourseLinks from "./components/CourseLinks.jsx";
import TransactionsDashboard from "./components/TransactionDashboard.jsx";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:title" element={<CourseDetails />} />
            <Route path="/courses/:title/buy" element={<BuyPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/transactiondashboard"
              element={<TransactionsDashboard />}
            />
            <Route
              path="/courses/:courseId/details"
              element={<CourseLinks />}
            />

            {/* Protected Admin Routes */}
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadImage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course-form"
              element={
                <ProtectedRoute>
                  <CourseForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/promocode-form"
              element={
                <ProtectedRoute>
                  <PromoCodeForm />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
