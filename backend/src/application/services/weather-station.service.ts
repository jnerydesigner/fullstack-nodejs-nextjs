import { ILogger } from "@infra/logger/logger.interface";
import { LoggerTypes } from "@infra/types/logger.type";
import { inject, injectable } from "inversify";

interface ObserverDTO {
  observer: string;
  notification: string;
}

interface IObserver {
  update(temperature: number): ObserverDTO;
}

interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): ObserverDTO[];
}

@injectable()
export class WeatherStationService implements ISubject {
  constructor(@inject(LoggerTypes.Logger) private readonly logger: ILogger) {}
  private observers: IObserver[] = [];
  private temperature = 0;
  subscribe(observer: IObserver): void {
    const observerExists = this.observers.includes(observer);
    if (!observerExists) this.observers.push(observer);
  }
  unsubscribe(observer: IObserver): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  setTemperature(temperature: number): ObserverDTO[] {
    this.logger.info(`📡 Temperatura atualizada para ${temperature}°C`);
    this.temperature = temperature;
    return this.notify();
  }
  notify(): ObserverDTO[] {
    return this.observers.map((obs) => obs.update(this.temperature));
  }
}

@injectable()
export class DisplayObserver implements IObserver {
  constructor(@inject(LoggerTypes.Logger) private readonly logger: ILogger) {}
  update(temperature: number): ObserverDTO {
    this.logger.info(`🌡️ Display: Temperatura é ${temperature}°C`);
    return {
      observer: "Display",
      notification: `🌡️ Display: Temperatura é ${temperature}°C`,
    };
  }
}

@injectable()
export class LoggerObserver implements IObserver {
  constructor(@inject(LoggerTypes.Logger) private readonly logger: ILogger) {}
  update(temperature: number): ObserverDTO {
    this.logger.info(`📝 Logger: Registrando temperatura ${temperature}°C`);
    return {
      observer: "Logger",
      notification: `📝 Logger: Registrando temperatura ${temperature}°C`,
    };
  }
}

@injectable()
export class CriticalAlertObserver implements IObserver {
  constructor(@inject(LoggerTypes.Logger) private readonly logger: ILogger) {}
  update(temperature: number): ObserverDTO {
    this.logger.info(
      `🌡️ Temperatura Critica ${temperature}°C: Enviando Email 📧`
    );
    return {
      observer: "Send Mail",
      notification: `🌡️ Temperatura Critica ${temperature}°C: Enviando Email 📧`,
    };
  }
}
