import { Product } from "@/types/type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This enables sending cookies with cross-origin requests
});

export const ProductCard = (props: Product) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onClick = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.put(`/product/buy/${id}`);
      const data = await response.data;
      if (data.message) {
        toast.success("Product purchased successfully");
      }
      navigate("/purchased-products");
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "You can't buy your own product"
        ) {
          toast.error("You can't buy your own product");
        } else {
          toast.error("An error occurred while purchasing the product");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{props.productName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 ">
            <img
              src={props.imageUrl}
              alt={props.productName}
              className="w-full h-44"
            />
            <p className="text-lg font-bold">Price: ${props.price}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onClick(props._id)}>
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Buy Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
