import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface ProductFormProps {
  mode: "create" | "edit";
  id?: string;
}

export function ProductForm({ mode, id }: ProductFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      price: 0,
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      // Fetch product data and populate the form
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/product/one/${id}`, {
            withCredentials: true,
          });
          const productData = await response.data;
          const data = productData.product;
          form.reset(data);
        } catch (error) {
          console.error("Failed to fetch product data", error);
          toast.error("Failed to load product data");
        }
      };

      fetchProduct();
    }
  }, [mode, id, form]);

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    try {
      setIsLoading(true);
      let response;
      if (mode === "create") {
        response = await axios.post(
          `${BASE_URL}/product/create`,
          {
            ...data,
            isSold: false,
          },
          { withCredentials: true }
        );
        toast.success("Product added successfully!");
      } else {
        response = await axios.put(
          `${BASE_URL}/product/${id}`,
          {
            ...data,
            isSold: false,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Product updated successfully!");
      }
      console.log(response.data);
      navigate("/posted-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(
        mode === "create"
          ? "Product could not be added!"
          : "Product could not be updated!"
      );
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {mode === "create" ? "Add a new Product" : "Edit Product"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Enter your product details to sell it."
            : "Update your product details."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {mode === "create" ? (
                isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Add Product"
                )
              ) : isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Update Product"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
