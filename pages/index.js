import ProductCard from "../components/products/ProductCard";
import data from "../utils/data";

export default function Home() {
  return <div className="grid lg:grid-cols-4 gap-4 mt-12">
    {data.products.map(e => (
      <ProductCard key={e.id} item = {e} />
    ))}
  </div>;
}
