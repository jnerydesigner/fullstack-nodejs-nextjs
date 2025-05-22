import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { IHttpService } from "@domain/http-service.interface";
import { UberType } from "@infra/types/uber.type";
import { UberController } from "@presenters/controllers/uber.controller";
import { Container } from "inversify";

const uberContainer = new Container();

uberContainer.bind<UberController>(UberType.UberController).to(UberController);
uberContainer.bind<IHttpService>(UberType.AxiosService).to(AxiosService);
uberContainer.bind<IHttpService>(UberType.FetchService).to(FetchService);

export { uberContainer };
