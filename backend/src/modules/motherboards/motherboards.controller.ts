import { Controller, Get, Param } from '@nestjs/common';
import { MotherboardsService } from './motherboards.service';

@Controller('motherboards')
export class MotherboardsController {
  constructor(private readonly motherboardsService: MotherboardsService) { }

  @Get()
  findAll() {
    return this.motherboardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motherboardsService.findOne(id);
  }
}
