import React, { useState, useEffect } from "react";

const CurrencyConverter = ({ amount }) => {
  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(amount);

  // Fetch exchange rates and convert the amount
  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const data = await response.json();
        const rate = data.rates[currency];
        setConvertedAmount((amount * rate).toFixed(2));
      } catch (error) {
        console.error("Error converting currency:", error);
      }
    };

    convertCurrency();
  }, [currency, amount]);

  return (
    <div className="mt-4">
      <label htmlFor="currency" className="mr-2">
        Convert to:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="INR">INR</option>
      </select>
      <p className="mt-2 text-lg font-semibold">
        Converted Amount: {convertedAmount} {currency}
      </p>
    </div>
  );
};

export default CurrencyConverter;
