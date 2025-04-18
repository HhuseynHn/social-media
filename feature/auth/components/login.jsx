/** @format */
"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import loginSchema from "../schema/login-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Button,
  ValidationError,
} from "@/common/components";
import { authLogin } from "../service/auth-service";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors)
        .map((error) => error.message)
        .join("\n");

      toast.error(`❌ Validation Error:\n${errorMessages}`, {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    const response = await authLogin(data);
    if (response.success) {
      toast("✅ Login successful! Redirecting...", {
        duration: 3000,
        position: "top-center",
      });
      router.push("/home");
    } else {
      toast(`❌ ${response.message || "Login failed. Please try again"}`, {
        duration: 3000,
        position: "top-center",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <ValidationError>{errors.email.message}</ValidationError>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <ValidationError>{errors.password.message}</ValidationError>
                )}
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline text-black">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
