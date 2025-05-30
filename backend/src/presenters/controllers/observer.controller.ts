import {
  CriticalAlertObserver,
  DisplayObserver,
  LoggerObserver,
  WeatherStationService,
} from "@application/services/weather-station.service";
import { PatternType } from "@infra/types/pattern.type";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ObserverController {
  constructor(
    @inject(PatternType.WeatherStationService)
    private readonly weatherStationService: WeatherStationService,
    @inject(PatternType.DisplayObserver)
    private readonly displayObserver: DisplayObserver,
    @inject(PatternType.LoggerObserver)
    private readonly loggerObserver: LoggerObserver,
    @inject(PatternType.CriticalAlertObserver)
    private readonly criticalAlertObserver: CriticalAlertObserver
  ) {}
  

  observer(req: Request, res: Response) {
    const { temperature } = req.body;

    this.weatherStationService.subscribe(this.displayObserver);
    this.weatherStationService.subscribe(this.loggerObserver);

    if (temperature > 80)
      this.weatherStationService.subscribe(this.criticalAlertObserver);
    else this.weatherStationService.unsubscribe(this.criticalAlertObserver);
    const observerNotification =
      this.weatherStationService.setTemperature(temperature);

    res.json({
      pattern: "Factory",
      temperature,
      paymentResponse: observerNotification,
    });
  }
}
