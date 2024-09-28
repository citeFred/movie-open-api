import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  /**
   * Get movie details
   * @param movieCd 
   * @example http://localhost:3000/movies?movieCd=20124072
   */
  // @Get()
  // async findMovie(@Query('movieCd') movieCd: string) {
  //   return this.moviesService.getMovieInfo(movieCd);
  // }
  @Get()
  async getMovies(@Query('title') title: string) {
    return this.moviesService.getMovies(title);
  }

  /**
   * Retrieve a list of movies.
   * @example http://localhost:3000/movies/list
   */
  @Get('list')
  async getMovieList() {
    return this.moviesService.getMovieList();
  }

  /**
   * Retrieve daily box office information.
   * @param date - The date to retrieve the box office data (in YYYYMMDD format).
   * @example http://localhost:3000/movies/daily?date=20230920
   */
  @Get('daily')
  async getDailyBoxOffice(@Query('date') date: string) {
    return this.moviesService.getDailyBoxOffice(date);
  }

  /**
   * Retrieve weekly box office information.
   * @param date - The date to retrieve the box office data (in YYYYMMDD format).
   * @example http://localhost:3000/movies/weekly?date=20230920
   */
  @Get('weekly')
  async getWeeklyBoxOffice(@Query('date') date: string) {
    return this.moviesService.getWeeklyBoxOffice(date);
  }
}
