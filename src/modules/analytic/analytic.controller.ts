import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticService } from './analytic.service';

@ApiTags('analytic')
@Controller('analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @Post('event')
  createEvent(): void {
    this.analyticService.createEvent();
  }
}
