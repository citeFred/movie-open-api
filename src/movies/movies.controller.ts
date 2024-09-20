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
}