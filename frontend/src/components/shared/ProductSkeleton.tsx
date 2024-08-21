import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ProductSkeleton = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[200px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 ">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-6 w-[180px]" />
        </CardFooter>
      </Card>
    </div>
  );
};
