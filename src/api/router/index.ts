import { Hono } from "hono";
import helloRouter from "./hello";

const app = new Hono().route("/hello", helloRouter);

export default app;
