import { Controller, Get, Param } from '@nestjs/common';
import { GpusService } from './gpus.service';

@Controller('gpus')
export class GpusController {
  constructor(private readonly gpusService: GpusService) { }

  @Get()
  findAll() {
    return this.gpusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gpusService.findOne(id);
  }
}
