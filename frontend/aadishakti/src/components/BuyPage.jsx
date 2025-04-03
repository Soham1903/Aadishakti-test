import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";

function BuyPage() {
  const { title } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const [formData, setFormData] = useState({
    customerName: user ? user.name : "",
    phoneNumber: "",
    courseTitle: title,
  });
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/courses/${title}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [title]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("customerName", formData.customerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("courseTitle", formData.courseTitle);
    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/transaction/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit transaction");
      }

      const data = await response.json();
      setSubmitSuccess(true);
      setFormData({
        customerName: user ? user.name : "",
        phoneNumber: "",
        courseTitle: title,
      });
      setScreenshot(null);
      setScreenshotPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#921a40]"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Course Header */}
          <div className="bg-[#921a40] text-white p-8">
            <h1 className="text-3xl font-bold text-center">
              Complete Your Purchase
            </h1>
          </div>

          {/* Course Details Card */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                <img
                  src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
                  alt={course.title}
                  className="w-full h-full object-cover transform transition hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <div className="text-2xl font-bold text-[#921a40] mb-4">
                  ${course.price}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#921a40]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[#921a40]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Certificate of Completion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-center mb-6">
                Scan QR Code to Make Payment
              </h3>
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-white rounded-xl shadow-md">
                  <img
                    src="https://image.similarpng.com/file/similarpng/original-picture/2021/06/QR-code-sample-for-smartphone-scanning-isolated-on-transparent-background-PNG.png"
                    alt="payment-qr-code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Transaction Form */}
            {submitSuccess && (
              <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-700 font-medium">
                    Transaction submitted successfully!
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#921a40] transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#921a40] hover:text-[#921a40] focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          required
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {screenshotPreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Screenshot Preview:
                    </p>
                    <img
                      src={screenshotPreview}
                      alt="Screenshot Preview"
                      className="w-40 h-40 object-cover rounded-lg border-2 border-[#921a40]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting
                    ? "bg-opacity-75 cursor-not-allowed bg-[#921a40]"
                    : "bg-[#921a40] hover:bg-[#7a1635] transform hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Complete Purchase"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;
