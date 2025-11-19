import { Controller, Get, Param } from '@nestjs/common';
import { SsdsService } from './ssds.service';

@Controller('ssds')
export class SsdsController {
  constructor(private readonly ssdsService: SsdsService) {}

  @Get()
  findAll() {
    return this.ssdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ssdsService.findOne(id);
  }
}
