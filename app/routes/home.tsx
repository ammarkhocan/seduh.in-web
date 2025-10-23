import type { Products } from "~/module/product/type";
import type { Route } from "./+types/home";

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
      <h1>Seduh.in</h1>
      <ul className="grid grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="size-54" />
            <h2>{product.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
