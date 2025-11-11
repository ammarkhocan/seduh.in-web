import Cookies from "js-cookie";
import type { CartResponse } from "~/modules/user/type";
import type { Route } from "./+types/cart";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");

  if (!token) return redirect("/login");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const cart: CartResponse = await response.json();

  return { cart };
}

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shoping Cart</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
