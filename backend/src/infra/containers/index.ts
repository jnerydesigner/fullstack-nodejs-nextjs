import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { UberMoviesService } from "@application/services/uber-movies.service";
import { IHttpService } from "@domain/http-service.interface";
import { UberType } from "@infra/types/uber.type";
import { ViaCepType } from "@infra/types/viacep.type";
import { UberController } from "@presenters/controllers/uber.controller";
import { ViaCepController } from "@presenters/controllers/viacep.controller";
import { Container } from "inversify";

const containerGeneral = new Container();

containerGeneral
  .bind<UberController>(UberType.UberController)
  .to(UberController);

containerGeneral
  .bind<UberMoviesService>(UberType.UberMoviesService)
  .to(UberMoviesService);

containerGeneral.bind<IHttpService>(UberType.AxiosService).to(AxiosService);
containerGeneral.bind<IHttpService>(UberType.FetchService).to(FetchService);

containerGeneral
  .bind<ViaCepController>(ViaCepType.ViaCepController)
  .to(ViaCepController);

export { containerGeneral };
