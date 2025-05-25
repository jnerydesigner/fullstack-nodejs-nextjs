import { UberMoviesResponseDTO } from "@application/dto/uber-movies-response.dto";
import { IHttpService } from "@domain/http-service.interface";
import { getFromCache, setToCache } from "@infra/cache/uber-movies.redis-cache";
import { logger } from "@infra/logger/logger.log";
import { HttpType } from "@infra/types/http.type";
import { inject, injectable } from "inversify";

@injectable()
export class UberMoviesService {
  readonly url = `https://data.sfgov.org/resource/yitu-d5am.json`;
  constructor(
    @inject(HttpType.AxiosService) private httpService: IHttpService
  ) {}
  async getAllMovies() {
    const key = "movies";
    const cached = await getFromCache<UberMoviesResponseDTO[]>(key);
    if (cached) return cached;
    const movies = await this.httpService.get<UberMoviesResponseDTO[]>(
      this.url
    );

    await setToCache(key, movies, 60 * 5);

    return movies;
  }

  async getMoviesForTitle(title: string | undefined) {
    const movies = await this.getAllMovies();

    if (!title) {
      return movies;
    }

    const moviesFilterTitle = movies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );

    logger.info(moviesFilterTitle);

    return moviesFilterTitle;
  }
}
