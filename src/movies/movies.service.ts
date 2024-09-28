import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MovieResponseDto } from 'src/dto/movie-response.dto';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY'); // 환경 변수에서 API 키를 가져옴
  }

  async getMovies(title: string): Promise<MovieResponseDto[]> {
    const encodedTitle = encodeURIComponent(title);
    const url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${encodedTitle}&ServiceKey=${this.apiKey}`;
    
    const response = await lastValueFrom(this.httpService.get(url));
    
    // 결과에서 필요한 데이터 추출 및 DTO 변환
    const movies = response.data.Data[0]?.Result || [];
  
    return movies.map(movie => ({
      title: this.cleanText(movie.title), // 제목에서 특수 문자 제거
      directorName: movie.directors?.director[0]?.directorNm || '', // 첫 번째 감독 이름
      actorName: movie.actors?.actor[0]?.actorNm || '', // 첫 번째 배우 이름
      genre: movie.genre.split(',')[0].trim() || '', // 첫 번째 장르만 가져오기
      contents: movie.plots?.plot[0]?.plotText || '', // 줄거리
      posterUrl: movie.posters.split('|')[0] || '', // 첫 번째 포스터 URL
      stillUrl: movie.stlls ? movie.stlls.split('|')[0] : '', // 첫 번째 스틸컷 URL
      favorite: 0, // 기본값
      runningTime: parseInt(movie.runtime, 10) || 0, // 상영시간
      nation: movie.nation.split(',')[0].trim() || '', // 첫 번째 국가만 가져오기
      company: movie.company.split(',')[0].trim() || '', // 첫 번째 제작사만 가져오기
      ratedYn: movie.ratedYn === 'Y', // 심의 여부
      type: movie.type.split(',')[0].trim() || '', // 유형
      releasedAt: this.parseReleaseDate(movie.ratings?.rating[0]?.releaseDate) || 
      this.parseReleaseDate(movie.repRlsDate) || null // 개봉일자
    }));
  }

    // 날짜 형식을 변환하는 메소드
  private parseReleaseDate(dateString: string | undefined): Date | null {
    if (!dateString) return null;
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작
    const day = parseInt(dateString.substring(6, 8), 10);
    return new Date(year, month, day);
  }

  // 특수 문자를 제거하는 메소드
  private cleanText(text: string): string {
    return text
      .replace(/!HS/g, '')
      .replace(/!HE/g, '')
      .replace(/\s+/g, ' ') // 연속된 공백을 하나의 공백으로 대체
      .trim(); // 양쪽 끝의 공백 제거
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