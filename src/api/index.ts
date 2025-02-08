import { Env, Hono } from "hono";
import { logger } from "hono/logger";
import routes from "./router";
import { env } from "hono/adapter";
import { Environments } from "./config/Environments";

let isInitialized = false;

const app = new Hono({
  strict: false,
})
  .use("*", async (c, next) => {
    try {
      // 初期化が済んでいない場合のみ実行
      if (!isInitialized) {
        const variables = env<Env>(c);
        if (!variables) {
          throw new Error("Environment variables are not set");
        }
        Environments.initialize(variables);
        isInitialized = true;
      }
    } catch (error) {
      console.error("Failed to initialize environment:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
    await next();
  })
  .basePath("/api")
  .use(logger())
  .route("/", routes)
  .notFound((c) => {
    c.status(404);
    return c.json({ status: 404, message: "Not Found" });
  })
  .onError((error, c) => {
    console.log("Unhandled Error:", error);
    return c.json({ status: 500, message: "Internal Server Error" });
  });

export type AppType = typeof routes;
export default app;
