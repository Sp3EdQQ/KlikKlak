import { Module } from '@nestjs/common';
import { HddsService } from './hdds.service';
import { HddsController } from './hdds.controller';

@Module({
  controllers: [HddsController],
  providers: [HddsService],
  exports: [HddsService],
})
export class HddsModule {}
