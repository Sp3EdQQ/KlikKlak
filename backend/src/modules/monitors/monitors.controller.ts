import { Controller, Get, Param } from '@nestjs/common';
import { MonitorsService } from './monitors.service';

@Controller('monitors')
export class MonitorsController {
  constructor(private readonly monitorsService: MonitorsService) { }

  @Get()
  findAll() {
    return this.monitorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorsService.findOne(id);
  }
}
