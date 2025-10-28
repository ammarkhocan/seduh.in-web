import { ShoppingBagIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatPrice } from "~/lib/format";
import type { Products } from "~/modules/product/type";

export function ProductsGrid({ products }: { products: Products }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.slug}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Stok: {product.stock}
                </p>
                <p className="text-lg font-bold text-stone-800 dark:text-stone-300 mb-4">
                  {formatPrice(product.price)}
                </p>
                <Button className="w-full bg-stone-800 hover:bg-stone-900 dark:bg-stone-700 dark:hover:bg-stone-800">
                  <ShoppingBagIcon className="w-4 h-4 mr-2" />
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
