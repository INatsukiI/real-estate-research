import { Hono } from "hono";
import { logger } from "hono/logger";
import routes from "./router";
import { DIContainer } from "./config/di-container";
import { DependencyTypes, diContainer } from "./config/di-config";

export type HonoVariables = {
  Variables: {
    diContainer: DIContainer<DependencyTypes>;
  };
};

const app = new Hono<HonoVariables>({
  strict: false,
})
  .use("*", async (c, next) => {
    try {
      c.set("diContainer", diContainer);
    } catch (error) {
      console.error("Failed to initialize:", error);
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
