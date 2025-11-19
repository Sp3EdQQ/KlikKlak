import { Controller, Get, Param } from '@nestjs/common';
import { RamsService } from './rams.service';

@Controller('rams')
export class RamsController {
  constructor(private readonly ramsService: RamsService) {}

  @Get()
  findAll() {
    return this.ramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramsService.findOne(id);
  }
}
