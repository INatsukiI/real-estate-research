import { Hono } from "hono";
import helloRouter from "./hello";
import municipalityRouter from "./municipality";

const app = new Hono()
  .route("/hello", helloRouter)
  .route("/municipalities", municipalityRouter);

export default app;
