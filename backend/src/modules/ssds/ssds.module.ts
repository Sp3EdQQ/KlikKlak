import { Module } from '@nestjs/common';
import { SsdsService } from './ssds.service';
import { SsdsController } from './ssds.controller';

@Module({
  controllers: [SsdsController],
  providers: [SsdsService],
  exports: [SsdsService],
})
export class SsdsModule { }
