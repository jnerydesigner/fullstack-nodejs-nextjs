import { AxiosService } from "@application/services/axios.service";
import { FetchService } from "@application/services/fetch.service";
import { NinjaService } from "@application/services/ninja.service";
import { PaymentService } from "@application/services/payment.service";
import { UberMoviesService } from "@application/services/uber-movies.service";
import {
  CriticalAlertObserver,
  DisplayObserver,
  LoggerObserver,
  WeatherStationService,
} from "@application/services/weather-station.service";
import { IHttpService } from "@domain/http-service.interface";
import { INinjaService } from "@domain/ininja-service.interface";
import { IPayment } from "@domain/payment.interface";
import { ILogger } from "@infra/logger/logger.interface";
import { PinoLogger } from "@infra/logger/pino-logger";
import { LoggerTypes } from "@infra/types/logger.type";

import { NinjaType } from "@infra/types/ninja.type";
import { PatternType } from "@infra/types/pattern.type";
import { UberType } from "@infra/types/uber.type";
import { ViaCepType } from "@infra/types/viacep.type";
import { FactoryController } from "@presenters/controllers/factory.controller";
import { NinjaController } from "@presenters/controllers/ninja.controller";
import { ObserverController } from "@presenters/controllers/observer.controller";
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

containerGeneral
  .bind<NinjaController>(NinjaType.NinjaController)
  .to(NinjaController);
containerGeneral.bind<INinjaService>(NinjaType.NinjaService).to(NinjaService);

containerGeneral
  .bind<ILogger>(LoggerTypes.Logger)
  .to(PinoLogger)
  .inSingletonScope();

containerGeneral
  .bind<ObserverController>(PatternType.ObserverController)
  .to(ObserverController);

containerGeneral
  .bind<FactoryController>(PatternType.FactoryController)
  .to(FactoryController);

containerGeneral.bind<IPayment>(PatternType.PaymentService).to(PaymentService);
containerGeneral
  .bind<WeatherStationService>(PatternType.WeatherStationService)
  .to(WeatherStationService);

containerGeneral
  .bind<DisplayObserver>(PatternType.DisplayObserver)
  .to(DisplayObserver);

containerGeneral
  .bind<LoggerObserver>(PatternType.LoggerObserver)
  .to(LoggerObserver);

containerGeneral
  .bind<CriticalAlertObserver>(PatternType.CriticalAlertObserver)
  .to(CriticalAlertObserver);

export { containerGeneral };
