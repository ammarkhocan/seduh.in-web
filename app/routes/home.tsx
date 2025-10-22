import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Seduh.in" }, { name: "description", content: "Coffe from the Seduh.in" }];
}

export async function clientLoader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
  const products = await response.json();
  console.log(products);
  return { products };
}

export default function Home() {
  return (
    <div>
      <h1>Seduh.in</h1>
    </div>
  );
}
