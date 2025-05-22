import { UberMoviesResponseDTO } from "@application/dto/uber-movies-response.dto";
import { IHttpService } from "@domain/http-service.interface";
import { HttpType } from "@infra/types/http.type";
import { inject, injectable } from "inversify";

@injectable()
export class UberMoviesService {
  constructor(
    @inject(HttpType.AxiosService) private httpService: IHttpService
  ) {}
  async getAllMovies() {
    const movies = await this.httpService.get<UberMoviesResponseDTO[]>(
      `https://data.sfgov.org/resource/yitu-d5am.json`
    );

    return movies;
  }

  async getMoviesForTitle(title: string | undefined) {
    const movies = await this.httpService.get<UberMoviesResponseDTO[]>(
      `https://data.sfgov.org/resource/yitu-d5am.json`
    );

    if (!title) {
      return movies;
    }

    const moviesFilterTitle = movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );

    return moviesFilterTitle;
  }
}
