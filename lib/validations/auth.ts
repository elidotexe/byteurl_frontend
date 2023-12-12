import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(5, "Email is too short").email("Email is invalid"),
  password: z.string().min(8, "Password is too short"),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, "Name is too short").max(32, "Name is too long"),
  email: z.string().min(5, "Email is too short").email("Email is invalid"),
  password: z.string().min(8, "Password is too short"),
  confirmPassword: z.string().min(8, "Password is too short"),
});
