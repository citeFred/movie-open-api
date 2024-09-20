import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  /**
   * Get movie details
   * @param movieCd 
   * example : http://localhost:3000/movies?movieCd=20124079
   */
  @Get()
  async findMovie(@Query('movieCd') movieCd: string) {
    return this.moviesService.getMovieInfo(movieCd);
  }

  /**
   * Retrieve a list of movies.
   * @param apiKey - The API key for authentication.
   * @example http://localhost:3000/movies/list?apiKey=${apiKey}
   */
  @Get('list')
  async getMovieList(@Query('apiKey') apiKey: string) {
    return this.moviesService.getMovieList(apiKey);
  }

    /**
   * Retrieve daily box office information.
   * @param apiKey - The API key for authentication.
   * @param date - The date to retrieve the box office data (in YYYYMMDD format).
   * @example http://localhost:3000/movies/daily?apiKey=${apiKey}&date=20230920
   */
    @Get('daily')
    async getDailyBoxOffice(@Query('apiKey') apiKey: string, @Query('date') date: string) {
      return this.moviesService.getDailyBoxOffice(apiKey, date);
  }
}