import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginBodyJsonSchema = {
  body: zodToJsonSchema(loginBodySchema, "LoginBody"),
};