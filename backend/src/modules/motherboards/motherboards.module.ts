import { Module } from '@nestjs/common';
import { MotherboardsService } from './motherboards.service';
import { MotherboardsController } from './motherboards.controller';

@Module({
  controllers: [MotherboardsController],
  providers: [MotherboardsService],
  exports: [MotherboardsService],
})
export class MotherboardsModule {}
