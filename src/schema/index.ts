import { UserRole } from "@/enums";
import * as z from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required." }),
  })
  .strict();

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Minimum 8 characters required." }),
    name: z.string().min(1, { message: "Name is required." }),
    role: z.nativeEnum(UserRole).default(UserRole.User),
  })
  .strict();
