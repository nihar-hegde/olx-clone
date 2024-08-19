import React, { useEffect, useState } from "react";

const PostedProducts: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch posted products from backend
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-10">Posted Products</h1>
      {/* Display the posted products here */}
    </div>
  );
};

export default PostedProducts;
