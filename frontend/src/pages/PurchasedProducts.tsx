import React, { useEffect, useState } from "react";

const PurchasedProducts: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch purchased products from backend
  }, []);

  return (
    <div className="p-20">
      <h1 className="text-2xl font-semibold ml-10">Purchased Products</h1>
      {/* Display the purchased products here */}
    </div>
  );
};

export default PurchasedProducts;
