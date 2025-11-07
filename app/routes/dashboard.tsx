import type { MeResponse } from "~/modules/user/type";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function clientLoader() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/auth/me`);

  const meResponse: MeResponse = await response.json();

  return { meResponse };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { meResponse } = loaderData;

  return (
    <div className="min-h-screen bg-background py-8">
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(meResponse, null, 2)}</pre>
    </div>
  );
}
