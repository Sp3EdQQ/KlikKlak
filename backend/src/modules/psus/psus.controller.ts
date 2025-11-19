import { Controller, Get, Param } from '@nestjs/common';
import { PsusService } from './psus.service';

@Controller('psus')
export class PsusController {
  constructor(private readonly psusService: PsusService) {}

  @Get()
  findAll() {
    return this.psusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psusService.findOne(id);
  }
}
