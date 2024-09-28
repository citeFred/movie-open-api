import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class DataCrawlerService {
    constructor(private readonly moviesService: MoviesService) {}

    // Scheduled Works
    // @Cron('*/1 * * * *') // every 1 min
    async handleCron() {
        // const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const date = "20230901";
        // need to make date confirm algorithm for handle it. 

        // Daily rank data crawling
        const dailyData = await this.moviesService.getDailyBoxOffice(date);
        console.log('Daily Box Office Data:', JSON.stringify(dailyData, null, 2));

        // Weekly rank data crawling
        const weeklyData = await this.moviesService.getWeeklyBoxOffice(date);
        console.log('Weekly Box Office Data:', JSON.stringify(weeklyData, null, 2));
    }
}
