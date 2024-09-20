import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY'); // 환경 변수에서 API 키를 가져옴
  }

  async getMovieInfo(movieCd: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${this.apiKey}&movieCd=${movieCd}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovieList() {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${this.apiKey}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getDailyBoxOffice(date: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${this.apiKey}&targetDt=${date}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getWeeklyBoxOffice(date: string) {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${this.apiKey}&targetDt=${date}&weekGb=0`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}