import { Module } from '@nestjs/common';
import { PinModule } from '../pin/pin.module';
import { TransfersController } from './transfers.controller';

@Module({
  imports: [PinModule],
  controllers: [TransfersController],
})
export class TransfersModule {}
