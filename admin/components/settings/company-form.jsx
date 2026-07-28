"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { companySchema } from "./company-schema";
import { companyDefaults } from "./company-defaults";

import { useSettings, useUpdateSettings } from "@/hooks/useSettings";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: companyDefaults,
  });

  console.log("WATCH", watch());

  const { data, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  useEffect(() => {
    if (!data?.data) return;

    reset({
      companyName: data.data.companyName || "",
      tagline: data.data.tagline || "",
      about: data.data.about || "",
    });
  }, [data, reset]);

  const onSubmit = (values) => {
    console.log("Submitted values:", values);
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>

        <CardDescription>Update your business profile.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>

            <Input id="companyName" {...register("companyName")} />

            {errors.companyName && (
              <p className="text-sm text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>

            <Input id="tagline" {...register("tagline")} />

            {errors.tagline && (
              <p className="text-sm text-red-500">{errors.tagline.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About</Label>

            <Textarea id="about" rows={5} {...register("about")} />

            {errors.about && (
              <p className="text-sm text-red-500">{errors.about.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
