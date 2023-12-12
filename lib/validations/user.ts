import * as z from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3, "Name is too short").max(32, "Name is too long"),
});
