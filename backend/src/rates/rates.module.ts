import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { RateSnapshot } from './entities/rate-snapshot.entity';
import { RatesService } from './rates.service';
import { RatesProcessor, RATES_QUEUE } from './rates.processor';
import { RatesController } from './rates.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RateSnapshot]),
    BullModule.registerQueue({ name: RATES_QUEUE }),
  ],
  providers: [RatesService, RatesProcessor],
  controllers: [RatesController],
  exports: [RatesService],
})
export class RatesModule {}
