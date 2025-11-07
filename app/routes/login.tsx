import Cookies from "js-cookie";

import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/login";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card";
import type { LoginResponse } from "~/modules/user/type";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Log In" }];
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800 mt-5">Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="********" className="w-full" />
            </div>
            <Button type="submit" className="w-full  text-white font-medium">
              Log In
            </Button>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link className="text-amber-700 hover:underline font-bold" to="/register">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const loginBody = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginBody),
  });

  const loginResponse: string = await response.text();
  // console.log(loginResponse);

  Cookies.set("token", loginResponse);

  return redirect("/dashboard");
}
