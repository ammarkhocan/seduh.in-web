import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/products";
import { ProductsGrid } from "~/modules/product/components/product-grid";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Products - Seduh.in" }, { name: "description", content: "All products Coffe from the Seduh.in" }];
}

export async function clientLoader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
  const products: Products = await response.json();

  console.log(products);

  return { products };
}

export default function ProductsRoute({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Seduh.in Website</h1>
          <p className="text-muted-foreground">Pilihan kopi premium untuk Anda</p>
        </div>
        <section>
          <ProductsGrid products={products} />
        </section>
      </div>
    </div>
  );
}
