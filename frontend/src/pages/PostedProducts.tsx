import { PostedProductCard } from "@/components/shared/PostedProductCard";
import { Product } from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PostedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/product/posted`, {
          withCredentials: true,
        });
        const data = await response.data;
        console.log(data);
        if (Array.isArray(data.products.postedProducts)) {
          setProducts(data.products.postedProducts);
        } else {
          setError("Received invalid data format");
        }
      } catch (error) {
        console.log("An unexpected error occurred:", error);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostedProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDelete = (deletedId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedId)
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Posted Products</h1>
        <h2 className="font-semibold text-lg">
          Products you have posted for sale.
        </h2>
      </div>

      <div className="flex justify-start flex-wrap gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <PostedProductCard
              key={product._id}
              _id={product._id}
              productName={product.productName}
              price={product.price}
              imageUrl={product.imageUrl}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div>
            <p>No products posted yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostedProducts;
