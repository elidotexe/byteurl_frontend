import * as z from "zod";

export const linkSchema = z.object({
  title: z.string().min(3, "Title is too short").max(32, "Title is too long"),
  originalUrl: z.string().url("Invalid URL"),
  shortUrl: z.string().default(""),
  clicks: z.number().default(0),
});
