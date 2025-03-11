import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import { useService } from "../context/service";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [donorName, setDonorName] = useState("");
  const [donorContact, setDonorContact] = useState("");
  const [amount, setAmount] = useState("");

  const { handlePayment, loading } = useService();

  async function handleSubmit(e) {
    e.preventDefault();
    await handlePayment({
      donorName,
      donorContact,
      amount,
      elements,
      stripe,
      CardElement,
    });

    setDonorName("");
    setDonorContact("");
    setAmount("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6"
    >
      <div className="flex items-center justify-center mb-9">
        <GiEarthAmerica className="text-blue-600 text-4xl" />
        <h2 className="ml-2 text-xl font-semibold text-gray-700">
          Disaster Management
        </h2>
      </div>

      <input
        type="text"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
        placeholder="Enter your name"
        required
        className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        value={donorContact}
        onChange={(e) => setDonorContact(e.target.value)}
        placeholder="Enter your contact number"
        required
        className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in PKR"
        required
        className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="p-3 border border-gray-300 rounded-lg mb-4">
        <CardElement className="p-1 text-sm" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-sm text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {loading ? (
          <div className="flex justify-center items-center gap-2">
            <i className="fa fa-spinner fa-spin"></i>
            <p>Processing...</p>
          </div>
        ) : (
          "Donate Now"
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
