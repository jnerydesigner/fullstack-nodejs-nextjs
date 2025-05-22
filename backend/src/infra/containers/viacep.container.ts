import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { IHttpService } from "@domain/http-service.interface";
import { ViaCepType } from "@infra/types/viacep.type";
import { ViaCepController } from "@presenters/controllers/viacep.controller";
import { Container } from "inversify";

const viacepContainer = new Container();

viacepContainer
  .bind<ViaCepController>(ViaCepType.ViaCepController)
  .to(ViaCepController);
viacepContainer.bind<IHttpService>(ViaCepType.AxiosService).to(AxiosService);
viacepContainer.bind<IHttpService>(ViaCepType.FetchService).to(FetchService);

export { viacepContainer };
