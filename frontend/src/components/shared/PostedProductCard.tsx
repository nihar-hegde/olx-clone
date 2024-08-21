import { useState } from "react";
import { Product } from "@/types/type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

interface PostedProductCardProps extends Product {
  onDelete: (id: string) => void;
}

export const PostedProductCard = (props: PostedProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/product/${id}`);
      toast.success("Product deleted successfully");
      props.onDelete(id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
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
            {props.isSold ? (
              <p className="text-lg font-bold p-2 rounded-md bg-green-400">
                Sold
              </p>
            ) : (
              <p className="text-lg font-bold p-2 rounded-md bg-gray-200">
                Not Sold
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Link
            to={`/edit-product/${props._id}`}
            className={`${buttonVariants()} w-full`}
          >
            Edit
          </Link>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={() => handleDelete(props._id)}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "Delete"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
