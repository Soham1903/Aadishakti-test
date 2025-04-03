import { useState } from "react";

function PromoCodeForm() {
  const [promoData, setPromoData] = useState({
    code: "",
    discountType: "percentage", // Default to percentage
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Format date properly for API
      const formattedData = {
        ...promoData,
        discountValue: parseFloat(promoData.discountValue),
        minOrderValue: parseFloat(promoData.minOrderValue),
        maxDiscount: parseFloat(promoData.maxDiscount),
        usageLimit: parseInt(promoData.usageLimit),
      };

      // Send request to backend API
      const response = await fetch(
        "http://localhost:4000/api/promocode/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Promo code created successfully!");
        setMessageType("success");

        // Reset form
        setPromoData({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minOrderValue: "",
          maxDiscount: "",
          usageLimit: "",
          expiryDate: "",
        });
      } else {
        setSubmitMessage(
          `Error: ${data.error || "Failed to create promo code"}`
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Failed to create promo code. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Promo Code
      </h2>

      {submitMessage && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            messageType === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Promo Code */}
        <div>
          <label className="block text-gray-700 font-medium">Promo Code</label>
          <input
            type="text"
            name="code"
            value={promoData.code}
            onChange={handleChange}
            placeholder="Enter promo code (e.g., SUMMER2025)"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Discount Type */}
        <div>
          <label className="block text-gray-700 font-medium">
            Discount Type
          </label>
          <select
            name="discountType"
            value={promoData.discountType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="block text-gray-700 font-medium">
            Discount Value{" "}
            {promoData.discountType === "percentage" ? "(%)" : "($)"}
          </label>
          <input
            type="number"
            step={promoData.discountType === "percentage" ? "1" : "0.01"}
            min="0"
            max={promoData.discountType === "percentage" ? "100" : undefined}
            name="discountValue"
            value={promoData.discountValue}
            onChange={handleChange}
            placeholder={`Enter discount value ${
              promoData.discountType === "percentage"
                ? "(e.g., 15 for 15%)"
                : "(e.g., 10.00 for $10)"
            }`}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Minimum Order Value */}
        <div>
          <label className="block text-gray-700 font-medium">
            Minimum Order Value ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="minOrderValue"
            value={promoData.minOrderValue}
            onChange={handleChange}
            placeholder="Enter minimum order value (e.g., 50.00)"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Maximum Discount */}
        <div>
          <label className="block text-gray-700 font-medium">
            Maximum Discount ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="maxDiscount"
            value={promoData.maxDiscount}
            onChange={handleChange}
            placeholder="Enter maximum discount (e.g., 25.00)"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Usage Limit */}
        <div>
          <label className="block text-gray-700 font-medium">Usage Limit</label>
          <input
            type="number"
            min="1"
            name="usageLimit"
            value={promoData.usageLimit}
            onChange={handleChange}
            placeholder="Enter maximum number of uses"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-700 font-medium">Expiry Date</label>
          <input
            type="datetime-local"
            name="expiryDate"
            value={promoData.expiryDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded-lg transition`}
        >
          {isSubmitting ? "Creating..." : "Create Promo Code"}
        </button>
      </form>
    </div>
  );
}

export default PromoCodeForm;
