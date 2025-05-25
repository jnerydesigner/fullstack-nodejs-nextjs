import "dotenv/config";
import "reflect-metadata";
import { logger } from "@infra/logger/logger.log";
import { uberRoutes } from "@presenters/routes/uber.route";
import { viaCepRoutes } from "@presenters/routes/viacep.route";
import express, { Request, Response } from "express";
import { connectionRedis } from "@infra/cache/redis";

const PORT = process.env.SERVER_PORT || 3333;

async function bootstrap() {
  await connectionRedis();

  const app = express();

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Hello Word",
    });
  });

  app.use("/viacep", viaCepRoutes);
  app.use("/uber", uberRoutes);

  app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

bootstrap();
