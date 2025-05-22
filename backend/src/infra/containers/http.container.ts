import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { IHttpService } from "@domain/http-service.interface";
import { ViaCepType } from "@infra/types/viacep.type";
import { Container } from "inversify";

const httpContainer = new Container();

httpContainer;
httpContainer.bind<IHttpService>(ViaCepType.AxiosService).to(AxiosService);
httpContainer.bind<IHttpService>(ViaCepType.FetchService).to(FetchService);

export { httpContainer };
