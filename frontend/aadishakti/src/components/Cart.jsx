import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, Package2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleApplyCoupon = async () => {
    if (!code) {
      toast.error("⚠️ Please enter a promo code.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/promocode/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            code,
            orderValue: totalPrice,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setDiscountedPrice(totalPrice);
        toast.error("⚠️ Invalid or expired promo code. Discount: ₹0");
        return;
      }

      setDiscountedPrice(data.finalAmount);
      toast.success(`✅ ${data.message}`);
    } catch (err) {
      setDiscountedPrice(totalPrice);
      toast.error(`⚠️ ${err.message || "Something went wrong."}`);
    }
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your cart
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#921a40] text-white px-6 py-2 rounded-md hover:bg-[#821636] transition-colors w-full sm:w-auto"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="w-8 h-8 text-[#921a40]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Your Cart
              </h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <Package2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-[#921a40] text-white px-6 py-3 rounded-md hover:bg-[#821636] transition-colors w-full sm:w-auto"
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="w-full sm:w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={`data:${item.image.contentType};base64,${item.image.imageBase64}`}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 break-words">
                          {item.title}
                        </h3>
                        <p className="text-lg text-[#921a40] font-medium">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.title)}
                        className="w-full sm:w-auto px-4 py-2 text-white border rounded-lg transition-all duration-300 font-medium text-center"
                        style={{
                          color: "#921a40",
                          borderColor: "#921a40",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => (
                          (e.target.style.backgroundColor = "#921a40"),
                          (e.target.style.color = "white")
                        )}
                        onMouseLeave={(e) => (
                          (e.target.style.backgroundColor = "transparent"),
                          (e.target.style.color = "#921a40")
                        )}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t pt-6">
                  <div className="mb-6">
                    <label
                      htmlFor="coupon"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Promo Code
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        id="coupon"
                        value={code}
                        onChange={handleInputChange}
                        className="flex-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#921a40] focus:border-[#921a40] px-4 py-2"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-2 bg-[#921a40] text-white rounded-md hover:bg-[#821636] transition-colors whitespace-nowrap"
                      >
                        Apply Code
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    {discountedPrice < totalPrice && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount Applied</span>
                        <span>
                          -₹{(totalPrice - discountedPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                      <span>Total</span>
                      <span>₹{discountedPrice}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-[#921a40] text-white py-3 rounded-md hover:bg-[#821636] transition-colors font-medium text-lg">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
