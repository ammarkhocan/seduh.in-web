import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
import { formatPrice } from "~/lib/format";
import { Input } from "~/components/ui/input";

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
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6">
        {/* Product Detail */}
        <section className="flex flex-col md:flex-row items-start justify-center gap-12 max-w-6xl mx-auto">
          {/* Image Product */}
          <div className="flex-1 w-full">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-muted flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[420px] object-contain transition-transform duration-500"
              />
            </div>
          </div>

          {/* Detail Product */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">{product.name}</h2>
              <p className="text-muted-foreground text-sm">
                Origin: <span className="font-medium text-foreground">{product.origin}</span>
              </p>
            </div>

            <p className="text-3xl font-semibold">{formatPrice(product.price)}</p>

            <p className="text-base text-muted-foreground leading-relaxed max-w-md">{product.description}</p>

            <p className="text-sm text-muted-foreground">
              Stock:{" "}
              <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
              </span>
            </p>

            {/* Form Quantity */}
            <Form method="post" className="flex flex-row items-end gap-4 pt-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  required
                  disabled={product.stock === 0}
                  className="w-24 border border-muted-foreground/30"
                />
              </div>

              <Button type="submit">Add to Cart</Button>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
}
