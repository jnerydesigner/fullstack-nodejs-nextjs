import { containerGeneral } from "@infra/containers";

import { PatternType } from "@infra/types/pattern.type";
import { FactoryController } from "@presenters/controllers/factory.controller";

import { ObserverController } from "@presenters/controllers/observer.controller";
import { Router } from "express";

const patternsRoutes = Router();

const observerController = containerGeneral.get<ObserverController>(
  PatternType.ObserverController
);

const factoryController = containerGeneral.get<FactoryController>(
  PatternType.FactoryController
);

patternsRoutes.post(
  "/factory",
  factoryController.factory.bind(factoryController)
);

patternsRoutes.post(
  "/observer",
  observerController.observer.bind(observerController)
);

export { patternsRoutes };
