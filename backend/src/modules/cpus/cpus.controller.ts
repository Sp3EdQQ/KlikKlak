import { Controller, Get, Param } from '@nestjs/common';
import { CpusService } from './cpus.service';

@Controller('cpus')
export class CpusController {
  constructor(private readonly cpusService: CpusService) { }

  @Get()
  findAll() {
    return this.cpusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpusService.findOne(id);
  }
}
