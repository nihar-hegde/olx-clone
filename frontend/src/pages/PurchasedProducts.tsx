import { ProductSkeleton } from "@/components/shared/ProductSkeleton";
import { PurchasedProductCard } from "@/components/shared/PurchasedProductCard";
import { Product } from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PurchasedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/product/purchased`,

          {
            withCredentials: true,
          }
        );
        const data = await response.data;
        setProducts(data.products.purchasedProducts);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostedProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-start flex-wrap gap-4">
        {/* Render 8 skeleton cards while loading */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <ProductSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Purchased Products</h1>
        <h2 className="font-semibold text-lg">Products you have purchased.</h2>
      </div>
      <div className="flex justify-start flex-wrap gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <PurchasedProductCard
              key={product._id}
              _id={product._id}
              productName={product.productName}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <div>
            <p>No products Purchased yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedProducts;
