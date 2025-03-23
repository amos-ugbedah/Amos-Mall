import { useState, useEffect } from "react";

const useCurrency = () => {
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const data = await res.json();
        setExchangeRate(data.rates[currency]);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
      }
    };

    fetchExchangeRate();
  }, [currency]);

  return { currency, exchangeRate, setCurrency };
};

export default useCurrency;