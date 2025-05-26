import { INinjaService, AttackType } from "@domain/ininja-service.interface";
import { injectable } from "inversify";

@injectable()
export class NinjaService implements INinjaService {
  kickAttack(): AttackType {
    return {
      damage: 10,
    };
  }
  swordAttack(): AttackType {
    return {
      damage: 80,
    };
  }
  starAttack(): AttackType {
    return {
      damage: 60,
    };
  }
}
