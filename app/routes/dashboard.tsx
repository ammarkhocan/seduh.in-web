import Cookies from "js-cookie";

import type { MeResponse } from "~/modules/user/type";
import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { User } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function clientLoader() {
  //Token
  const token = Cookies.get("token");

  if (!token) return redirect("/login");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

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
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {meResponse.fullName}!
          </h1>
          <p className="text-gray-600">Here’s your account overview</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b pb-3 mt-6">
            <CardTitle className="text-xl font-semibold text-center text-gray-800">
              Profile Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">User ID</p>
                <p className="font-medium text-gray-900">{meResponse.id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Full Name</p>
                <p className="font-medium text-gray-900">
                  {meResponse.fullName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Username</p>
                <p className="font-medium text-gray-900">
                  {meResponse.username}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Email</p>
                <p className="font-medium text-gray-900">{meResponse.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
