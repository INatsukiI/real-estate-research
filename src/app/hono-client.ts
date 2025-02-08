import { AppType } from "@/api";
import { hc } from "hono/client";

export const client = hc<AppType>(
  process.env["API_ENDPOINT"] ?? "http://localhost:3000/api"
);
