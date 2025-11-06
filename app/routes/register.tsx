import { Form } from "react-router";
import type { Route } from "./+types/register";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Create new account</h1>

      <Form>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" name="username" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" />
        </div>
        <div>
          <Label htmlFor="full-name">Full Name</Label>
          <Input id="full-name" type="text" name="fullName" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
        </div>
        <Button type="submit">Create New Account</Button>
      </Form>
    </div>
  );
}
