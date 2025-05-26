import { INinjaService } from "@domain/ininja-service.interface";
import { NinjaType } from "@infra/types/ninja.type";

import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class NinjaController {
  constructor(
    @inject(NinjaType.NinjaService)
    private ninjaService: INinjaService
  ) {}
  async swordAttack(req: Request, res: Response) {
    const { damage } = this.ninjaService.swordAttack();
    res.json({
      attack: "sword",
      damage,
    });
  }

  async starAttack(req: Request, res: Response) {
    const { damage } = this.ninjaService.starAttack();
    res.json({
      attack: "star",
      damage,
    });
  }

  async kickAttack(req: Request, res: Response) {
    const { damage } = this.ninjaService.kickAttack();
    res.json({
      attack: "kick",
      damage,
    });
  }
}
