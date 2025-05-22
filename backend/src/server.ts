import { logger } from "@infra/logger/logger.log";
import { uberRoutes } from "@presenters/routes/uber.route";
import { viaCepRoutes } from "@presenters/routes/viacep.route";
import "dotenv/config";
import express, { Request, Response } from "express";

const PORT = process.env.SERVER_PORT || 3333;

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
