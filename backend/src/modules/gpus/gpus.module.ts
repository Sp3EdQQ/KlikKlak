import { Module } from '@nestjs/common';
import { GpusService } from './gpus.service';
import { GpusController } from './gpus.controller';

@Module({
  controllers: [GpusController],
  providers: [GpusService],
  exports: [GpusService],
})
export class GpusModule { }
