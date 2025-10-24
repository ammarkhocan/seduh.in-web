import type { Products } from "~/module/product/type";
import type { Route } from "./+types/home";
import { formatPrice } from "~/lib/format";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

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
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Seduh.in Website</h1>
          <p className="text-muted-foreground">Pilihan kopi premium untuk Anda</p>
        </div>

        {/* Products Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <li key={product.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <img src={product.imageUrl} alt={product.name} className="w-full h-90 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Stok: {product.stock}</p>
                  <p className="text-lg font-bold text-stone-800 dark:text-stone-300 mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <button className="w-full bg-stone-800 hover:bg-stone-900 dark:bg-stone-700 dark:hover:bg-stone-800 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to cart
                  </button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
