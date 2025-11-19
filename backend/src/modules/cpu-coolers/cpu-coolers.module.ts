import { Module } from '@nestjs/common';
import { CpuCoolersService } from './cpu-coolers.service';
import { CpuCoolersController } from './cpu-coolers.controller';

@Module({
  controllers: [CpuCoolersController],
  providers: [CpuCoolersService],
  exports: [CpuCoolersService],
})
export class CpuCoolersModule { }
