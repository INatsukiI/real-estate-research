import { HonoVariables } from "@/api";
import { Hono } from "hono";

const app = new Hono<HonoVariables>().get("/", async (c) => {
  try {
    const { area, language } = c.req.query();

    const di = c.get("diContainer");
    const getMunicipalitiesUseCase = di.get("GetMunicipalitiesUseCase");
    const municipalities = await getMunicipalitiesUseCase.execute({
      area,
      language: language as "ja" | "en" | undefined,
    });

    return c.json(municipalities);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ message: error.message }, 400);
    }
    return c.json({ message: "Internal Server Error" }, 500);
  }
});

export default app;
