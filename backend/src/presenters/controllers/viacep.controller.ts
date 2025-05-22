import { ViaCepResponseDTO } from "@application/dto/viacep-response.dto";
import { IHttpService } from "@domain/http-service.interface";

import { ViaCepType } from "@infra/types/viacep.type";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ViaCepController {
  constructor(
    @inject(ViaCepType.AxiosService) private httpService: IHttpService
  ) {}
  async getAddressForCep(req: Request, res: Response) {
    const cep = req.params.cep;
    const viacep = await this.httpService.get<ViaCepResponseDTO>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    res.json({
      viacep,
    });
  }
}
