"use server";

import { z } from "zod";

import { LoginSchema } from "@/schema";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials" };
  }

  return { success: "User login successful." };
};
