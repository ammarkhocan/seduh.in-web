import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Products Details" }, { name: "description", content: "Products Description." }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const slug = params.slug;

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products/${slug}`);
  const product: Product = await response.json();

  console.log(product);

  return { product };
}

export default function ProductsRoute({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Seduh.in Website</h1>
          <p className="text-muted-foreground">Pilihan kopi premium untuk Anda</p>
        </div>

        {/* Products Section */}
        <section>
          <pre className="max-w-xl">{JSON.stringify(product, null, 2)}</pre>
        </section>
      </div>
    </div>
  );
}
