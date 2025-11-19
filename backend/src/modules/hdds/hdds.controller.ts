import { Controller, Get, Param } from '@nestjs/common';
import { HddsService } from './hdds.service';

@Controller('hdds')
export class HddsController {
  constructor(private readonly hddsService: HddsService) { }

  @Get()
  findAll() {
    return this.hddsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hddsService.findOne(id);
  }
}
