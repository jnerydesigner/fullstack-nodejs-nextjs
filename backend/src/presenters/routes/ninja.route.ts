import { containerGeneral } from "@infra/containers";
import { NinjaType } from "@infra/types/ninja.type";

import { NinjaController } from "@presenters/controllers/ninja.controller";
import { Router } from "express";

const ninjaRoutes = Router();

const ninjaController = containerGeneral.get<NinjaController>(
  NinjaType.NinjaController
);

ninjaRoutes.get(
  "/sword-attack",
  ninjaController.swordAttack.bind(ninjaController)
);
ninjaRoutes.get(
  "/star-attack",
  ninjaController.starAttack.bind(ninjaController)
);

ninjaRoutes.get(
  "/kick-attack",
  ninjaController.kickAttack.bind(ninjaController)
);

export { ninjaRoutes };
