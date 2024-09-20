import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { format } from 'path';

@Injectable()
export class MoviesService {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async getMovieInfo(movieCd: string) {
    const apiKey = this.configService.get<string>('API_KEY'); // Get private API_KEY from Environment Variables
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieCd}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovieList(apiKey: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${apiKey}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getDailyBoxOffice(apiKey: string, date: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOffice.json?key=${apiKey}&targetDt=${date}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getWeeklyBoxOffice(apiKey: string, date: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOffice.json?key=${apiKey}&targetDt=${date}&weekGb=0`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
