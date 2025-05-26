import "dotenv/config";
import "reflect-metadata";
import { logger } from "@infra/logger/logger.log";
import { uberRoutes } from "@presenters/routes/uber.route";
import { viaCepRoutes } from "@presenters/routes/viacep.route";
import express, { NextFunction, Request, Response } from "express";
import { connectionRedis } from "@infra/cache/redis";
import { ninjaRoutes } from "@presenters/routes/ninja.route";
import { patternsRoutes } from "@presenters/routes/patterns.route";

const PORT = process.env.SERVER_PORT || 3333;

async function bootstrap() {
  await connectionRedis();

  const app = express();
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Hello Word",
    });
  });

  app.use("/viacep", viaCepRoutes);
  app.use("/uber", uberRoutes);
  app.use("/ninja", ninjaRoutes);
  app.use("/pattern", patternsRoutes);

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "Route Not Found",
      method: req.method,
      path: req.originalUrl,
    });
  });

  app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

bootstrap();
