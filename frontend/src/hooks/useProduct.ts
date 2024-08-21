import { Product } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

interface UseProductsResponse {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const useProduct = (): UseProductsResponse => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/product/all`);
        const data = await response.data;
        setProducts(data.products); // Set the products array to the state
      } catch (error) {
        setLoading(false);
        setError("Error fetching products!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { products, loading, error };
};

export default useProduct;
