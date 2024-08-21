import { ProductCard } from "@/components/shared/ProductCard";
import { ProductSkeleton } from "@/components/shared/ProductSkeleton";
import useProduct from "@/hooks/useProduct";

const Home = () => {
  const { products, loading } = useProduct();

  return (
    <main className="p-6">
      <div className="container mx-auto">
        {loading ? (
          <div className="flex justify-start flex-wrap gap-4">
            {/* Render 8 skeleton cards while loading */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <ProductSkeleton />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="flex justify-start flex-wrap gap-4">
            {products.map((product) => (
              <div key={product._id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-800 text-2xl font-semibold">
            No products available
          </p>
        )}
      </div>
    </main>
  );
};

export default Home;
