const exchangeRates = {
    USD: 1, // Base currency
    NGN: 1500, // Nigerian Naira
    GHS: 13, // Ghanaian Cedis
    JPY: 155, // Japanese Yen
    CAD: 1.35, // Canadian Dollar
    GBP: 0.79, // British Pound
    EUR: 0.92, // Euro
  };
  
  // Function to convert price from USD to selected currency
  export const convertCurrency = (amount, currency) => {
    return (amount * exchangeRates[currency]).toFixed(2);
  };
  
  // Function to get available currency options
  export const getCurrencyOptions = () => {
    return Object.keys(exchangeRates);
  };
  