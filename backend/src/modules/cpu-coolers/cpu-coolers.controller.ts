import { Controller, Get, Param } from '@nestjs/common';
import { CpuCoolersService } from './cpu-coolers.service';

@Controller('cpu-coolers')
export class CpuCoolersController {
  constructor(private readonly cpuCoolersService: CpuCoolersService) { }

  @Get()
  findAll() {
    return this.cpuCoolersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpuCoolersService.findOne(id);
  }
}
