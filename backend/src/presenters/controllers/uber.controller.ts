import { UberMoviesResponseDTO } from "@application/dto/uber-movies-response.dto";
import { UberMoviesService } from "@application/services/uber-movies.service";

import { IHttpService } from "@domain/http-service.interface";
import { HttpType } from "@infra/types/http.type";
import { UberType } from "@infra/types/uber.type";

import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UberController {
  constructor(
    @inject(UberType.UberMoviesService)
    private uberMoviesService: UberMoviesService
  ) {}
  async getAllMovies(req: Request, res: Response) {
    const movies = await this.uberMoviesService.getAllMovies();
    res.json({
      movies,
    });
  }

  async getMoviesForTitle(req: Request, res: Response) {
    const title = req?.query?.title as string;

    const movies = await this.uberMoviesService.getMoviesForTitle(title);
    res.json({
      movies,
    });
  }
}
