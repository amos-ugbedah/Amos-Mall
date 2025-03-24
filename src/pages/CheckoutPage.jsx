import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { convertCurrency } from "../utils/currencyConverter";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart(); // Added clearCart to empty cart after successful order
  const { currency } = useCurrency();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.country || !formData.phone) {
      alert("Please fill out all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d+$/.test(formData.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      clearCart(); // Clear the cart after order placement
      navigate("/order-success"); // Redirect to OrderSuccess page
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Billing Details</h3>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border rounded mb-3" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded mb-3" />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded mb-3" />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded mb-3" />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full p-2 border rounded mb-3" />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded mb-3" />

            <div className="mb-3">
              <label className="block mb-1">Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="bg-green-600 text-white w-full py-2 rounded">
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <p>{item.title} (x{item.quantity})</p>
                <p>{currency} {convertCurrency(item.price * item.quantity, currency)}</p>
              </div>
            ))}
            <div className="mt-4 text-lg font-semibold">
              Total: {currency} {convertCurrency(getTotalPrice(), currency)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
