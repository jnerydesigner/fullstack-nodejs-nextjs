import { containerGeneral } from "@infra/containers";

import { UberType } from "@infra/types/uber.type";
import { UberController } from "@presenters/controllers/uber.controller";
import { Router } from "express";

const uberRoutes = Router();

const uberController = containerGeneral.get<UberController>(
  UberType.UberController
);

uberRoutes.get("/", uberController.getAllMovies.bind(uberController));
uberRoutes.get("/find", uberController.getMoviesForTitle.bind(uberController));

export { uberRoutes };
