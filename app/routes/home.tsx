import type { Products } from "~/module/product/type";
import type { Route } from "./+types/home";
import { formatPrice } from "~/lib/format";
import { Button } from "~/components/ui/button";
import { BatteryFull } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Seduh.in" }, { name: "description", content: "Coffe from the Seduh.in" }];
}

export async function clientLoader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
  const products: Products = await response.json();

  console.log(products);

  return { products };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div>
      <h1>Seduh.in Website</h1>
      <ul className="grid grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="size-58" />
            <h2>{product.name}</h2>
            <p>stock: {product.stock}</p>
            <p>{formatPrice(product.price)}</p>
          </li>
        ))}
      </ul>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <BatteryFull />
        <Button>Click me</Button>
      </div>
    </div>
  );
}
