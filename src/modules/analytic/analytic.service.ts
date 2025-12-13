import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticService {
  createEvent(): void {
    console.log('AnalyticService: createEvent called');
  }
}
