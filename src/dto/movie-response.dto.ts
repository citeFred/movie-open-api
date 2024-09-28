export class MovieResponseDto {
    title: string;
    directorName: string; // 감독 이름
    actorName: string; // 배우 이름
    genre: string; // 필요시 추가
    contents: string; // 줄거리나 설명 추가 필요
    posterUrl: string;
    stillUrl: string;
    favorite: number; // 기본값 추가 필요
    runningTime: number;
    nation: string;
    company: string;
    ratedYn: boolean;
    type: string;
    releasedAt: Date;
}