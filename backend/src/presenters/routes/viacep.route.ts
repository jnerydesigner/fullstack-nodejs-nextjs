import { viacepContainer } from "@infra/containers/viacep.container";
import { ViaCepType } from "@infra/types/viacep.type";
import { ViaCepController } from "@presenters/controllers/viacep.controller";
import { Router } from "express";

const viaCepRoutes = Router();

const viaCepController = viacepContainer.get<ViaCepController>(
  ViaCepType.ViaCepController
);

viaCepRoutes.get(
  "/:cep",
  viaCepController.getAddressForCep.bind(viaCepController)
);

export { viaCepRoutes };
