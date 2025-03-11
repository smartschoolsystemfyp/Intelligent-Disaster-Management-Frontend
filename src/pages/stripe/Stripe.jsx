import React from "react";
import CheckoutForm from "../../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Stripe = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
11;

// 💳 Visa: 4242 4242 4242 4242
// ✅ Expiry Date: Any future date (e.g., 12/34)
// ✅ CVC: Any 3-digit number (e.g., 123)
// ✅ ZIP Code: Any 5-digit number (e.g., 10001)

export default Stripe;
