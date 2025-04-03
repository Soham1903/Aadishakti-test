import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import PropTypes from "prop-types"; // ✅ Import PropTypes

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log("user role", user?.role); // ✅ Optional chaining to avoid errors

  // Check if user is still loading
  if (!user) {
    return <div>Loading...</div>; // ✅ Show a loading state or skeleton
  }

  // Check if user is not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ✅ Define PropTypes for validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
