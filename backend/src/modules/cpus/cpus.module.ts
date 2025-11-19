import { Module } from '@nestjs/common';
import { CpusService } from './cpus.service';
import { CpusController } from './cpus.controller';

@Module({
  controllers: [CpusController],
  providers: [CpusService],
  exports: [CpusService],
})
export class CpusModule {}
