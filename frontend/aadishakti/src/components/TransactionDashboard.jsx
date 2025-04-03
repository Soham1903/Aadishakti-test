import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TransactionsDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/transaction/get"
        );
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const toggleVerification = async (transactionId, currentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/transaction/${transactionId}/verify`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isVerified: !currentStatus }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setTransactions(
          transactions.map((t) =>
            t._id === transactionId ? data.updatedTransaction : t
          )
        );
        toast.success(
          `Transaction ${!currentStatus ? "verified" : "unverified"}`
        );
      }
    } catch (error) {
      toast.error("Failed to update verification status");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading transactions...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Transactions Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">Payment Proof</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Verified</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{transaction.transactionId}</td>
                <td className="py-3 px-4">{transaction.customerName}</td>
                <td className="py-3 px-4">{transaction.courseTitle}</td>
                <td className="py-3 px-4">
                  {transaction.screenshot?.imageBase64 ? (
                    <>
                      <img
                        src={`data:${transaction.screenshot.contentType};base64,${transaction.screenshot.imageBase64}`}
                        alt="Payment proof"
                        className="w-16 h-16 object-cover cursor-pointer rounded"
                        onClick={() =>
                          setExpandedImage({
                            src: `data:${transaction.screenshot.contentType};base64,${transaction.screenshot.imageBase64}`,
                            alt: `Payment proof for ${transaction.customerName}`,
                          })
                        }
                      />
                    </>
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {transaction.isVerified ? (
                    <span className="text-green-600 font-medium">
                      ✅ Verified
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">❌ Pending</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() =>
                      toggleVerification(
                        transaction._id,
                        transaction.isVerified
                      )
                    }
                    className={`px-3 py-1 rounded-md ${
                      transaction.isVerified
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white transition-colors`}
                  >
                    {transaction.isVerified ? "Unverify" : "Verify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={expandedImage.src}
              alt={expandedImage.alt}
              className="max-w-full max-h-screen"
            />
            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsDashboard;
