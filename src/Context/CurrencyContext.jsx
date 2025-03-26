import React, { createContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD"); // Default currency

  // Hardcoded exchange rates (replace with API call if needed)
  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    NGN: 1700, // 1 USD = 1700 NGN
    JPY: 110,
  };

  // Currency options with flags
  const currencies = [
    { code: "USD", name: "US Dollar", flag: "us" },
    { code: "EUR", name: "Euro", flag: "eu" },
    { code: "GBP", name: "British Pound", flag: "gb" },
    { code: "NGN", name: "Nigerian Naira", flag: "ng" },
    { code: "JPY", name: "Japanese Yen", flag: "jp" },
  ];

  // Convert amount to selected currency
  const convertCurrency = (amount, targetCurrency) => {
    const rate = exchangeRates[targetCurrency] || 1;
    return (amount * rate).toFixed(2);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, currencies, convertCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
