import { containerGeneral } from "@infra/containers";

import { PatternType } from "@infra/types/pattern.type";

import { PatternsController } from "@presenters/controllers/pattern.controller";
import { Router } from "express";

const patternsRoutes = Router();

const patternController = containerGeneral.get<PatternsController>(
  PatternType.PatternsController
);

patternsRoutes.post(
  "/factory",
  patternController.factory.bind(patternController)
);

export { patternsRoutes };
