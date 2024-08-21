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

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/register`, data);

      await response.data;
      form.reset();
      toast.success("Successfully registered!");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // Check if the error message indicates that the email is already taken
        if (error.response.data.message === "Email already taken") {
          // Handle the specific "email already taken" error
          console.error("Error: Email is already registered.");
          toast("Error: Email is already registered.", {
            className: "bg-red-500",
            icon: "😕",
          });
        } else {
          console.error(
            "Error 400: Bad Request -",
            error.response.data.message
          );
          toast.error(`Error: ${error.response.data.message}`, {
            classNames: {
              toast: "bg-red-500",
            },
            icon: "😕",
          });
          form.setError("email", {
            type: "manual",
            message: "Email is already registered.",
          });
        }
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Josh Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
