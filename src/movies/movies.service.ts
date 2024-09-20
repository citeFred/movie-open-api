import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService) {}

  async getMovieInfo(apiKey: string, movieCd: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieCd}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
