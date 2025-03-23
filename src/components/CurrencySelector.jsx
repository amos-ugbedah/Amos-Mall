import React from "react";
import { useCurrency } from "../context/CurrencyContext";
import "flag-icons/css/flag-icons.min.css"; // Import flag icons CSS

const CurrencySelector = () => {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Currency:</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2 border rounded-md"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            <span className={`fi fi-${curr.flag} mr-2`}></span>
            {curr.name} ({curr.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
