import { ProductCard } from "@/components/shared/ProductCard";
import useProduct from "@/hooks/useProduct";

const Home = () => {
  const { products } = useProduct();
  console.log(products);
  return (
    <main className="p-6 ">
      <div className="container mx-auto">
        <div className="flex justify-start flex-wrap gap-4">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
