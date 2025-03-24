import { Link } from "react-router-dom";
import { Handshake } from "lucide-react"; // Ensure you have Lucide installed

const OrderSuccess = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-green-600">
        Order Successfully Placed! 🎉
      </h1>
      <p className="text-lg text-gray-700 mt-2 flex justify-center items-center gap-2">
        Thank you for shopping with us! We appreciate your patronage{" "}
        <Handshake size={28} className="text-green-600" />
      </p>
      <Link
        to="/"
        className="mt-5 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
