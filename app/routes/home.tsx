import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/home";
import { ProductsGrid } from "~/modules/product/components/product-grid";
import { HomeCarousel } from "~/modules/home/components/home-carousel";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Seduh.in" }, { name: "description", content: "Coffe from the Seduh.in" }];
}

export async function clientLoader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
  const products: Products = await response.json();

  return { products };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16">
          <HomeCarousel />
        </section>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Daily Dose of Freshly Brewed Coffee</h1>
          <p className="text-muted-foreground">Enjoy every sip with Seduh.in made from the finest local beans.</p>
        </div>

        {/* Products Section */}
        <section>
          <ProductsGrid products={products} />
        </section>
      </div>
    </div>
  );
}
