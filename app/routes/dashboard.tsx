import Cookies from "js-cookie";

import type { MeResponse } from "~/modules/user/type";
import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { User } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function clientLoader() {
  //Token
  const token = Cookies.get("token");

  if (!token) return redirect("/login");

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const meResponse: MeResponse = await response.json();

  return { meResponse };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { meResponse } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <p>Your account overview</p>

        <Card>
          <CardHeader>
            <CardTitle className="mt-9 text-center">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-gray-600 block mb-1">User ID</span>
                <span className="font-medium text-gray-900">{meResponse.id}</span>
              </div>
              <div>
                <span className="text-gray-600 block mb-1">Full Name</span>
                <span className="font-medium text-gray-900">{meResponse.fullName}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-gray-600 block mb-1">Username</span>
                <span className="font-medium text-gray-900">{meResponse.username}</span>
              </div>
              <div>
                <span className="text-gray-600 block mb-1">Email</span>
                <span className="font-medium text-gray-900">{meResponse.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
