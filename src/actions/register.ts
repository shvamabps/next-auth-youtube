"use server";

import { genSalt, hash } from "bcryptjs";
import { z } from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials" };
  }

  const user = await db.user.findUnique({
    where: {
      email: validatedFields.data.email,
      isDeleted: false,
    },
  });

  if (user) {
    return { error: "Email already in use." };
  }

  const SALT = await genSalt();

  const hashedPassword = await hash(validatedFields.data.password, SALT);

  await db.user.create({
    data: {
      email: validatedFields.data.email,
      name: validatedFields.data.name,
      password: hashedPassword,
    },
  });

  return { success: "User created." };
};
