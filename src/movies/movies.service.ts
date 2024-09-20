import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async getMovieInfo(movieCd: string) {
    const apiKey = this.configService.get<string>('API_KEY'); // Get private API_KEY from Environment Variables
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieCd}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
