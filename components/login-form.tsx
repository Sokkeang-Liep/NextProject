"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. define login Validation Rule
const loginRule = z.object({
  email: z.email("Please imput a valid email"),
  password: z
    .string()
    .min(8, "Password at least 8 characters long")
    .regex(/[a-z A-Z], "Password at least 1 letter"/)
    .regex(/[0-9], "Password at least 1 Number"/)
    .regex(/[^a-zA-Z0-9], "Password at least 1 specail character"/),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  //2. set form with loginRule
  const form = useForm<z.infer<typeof loginRule>>({
    resolver: zodResolver(loginRule),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //4.
  function MyloginRule(data: z.infer<typeof loginRule>) {
    console.log("form login data", data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 3.   call form for handl */}
          <form onSubmit={form.handleSubmit(MyloginRule)}noValidate>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input {...field} id="password" type="password" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
