import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async findMovie(@Query('apiKey') apiKey: string, @Query('movieCd') movieCd: string) {
    return this.moviesService.getMovieInfo(apiKey, movieCd);
  }
}