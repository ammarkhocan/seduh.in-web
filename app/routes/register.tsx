import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/register";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card";
import type { RegisterResponse } from "~/modules/user/type";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div className="flex items-center justify-center py-7">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800 mt-5">Create New Account</CardTitle>
          <CardDescription>Sign Up to your coffee journey</CardDescription>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" placeholder="Enter your username" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" type="text" placeholder="Your full name" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="********" className="w-full" />
            </div>
            <Button type="submit" className="w-full  text-white font-medium">
              Create New Account
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link className="text-amber-700 hover:underline font-bold" to="/login">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const registerBody = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    fullName: formData.get("fullName")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerBody),
  });

  const registerResponse: RegisterResponse = await response.json();
  console.log(registerResponse);

  return redirect("/login");
}
