import { Product } from "@/types/type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export const ProductCard = (props: Product) => {
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
          <Button className="w-full">Buy Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
