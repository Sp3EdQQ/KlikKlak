import { Module } from '@nestjs/common';
import { PsusService } from './psus.service';
import { PsusController } from './psus.controller';

@Module({
  controllers: [PsusController],
  providers: [PsusService],
  exports: [PsusService],
})
export class PsusModule { }
