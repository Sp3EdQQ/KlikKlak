import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ProductsModule } from '../products/products.module';
import { CpusModule } from '../cpus/cpus.module';
import { GpusModule } from '../gpus/gpus.module';
import { RamsModule } from '../rams/rams.module';
import { SsdsModule } from '../ssds/ssds.module';
import { HddsModule } from '../hdds/hdds.module';
import { MotherboardsModule } from '../motherboards/motherboards.module';
import { PsusModule } from '../psus/psus.module';
import { CpuCoolersModule } from '../cpu-coolers/cpu-coolers.module';
import { MonitorsModule } from '../monitors/monitors.module';
import { CasesModule } from '../cases/cases.module';

@Module({
  imports: [
    ProductsModule,
    CpusModule,
    GpusModule,
    RamsModule,
    SsdsModule,
    HddsModule,
    MotherboardsModule,
    PsusModule,
    CpuCoolersModule,
    MonitorsModule,
    CasesModule,
  ],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
