import { Controller, Get } from '@nestjs/common';
import { CheeseGateway } from './cheese.gateway';

@Controller('admin/ws')
export class WsAdminController {
  constructor(private readonly gateway: CheeseGateway) {}

  @Get('stats')
  getStats(): Promise<{ connectedUsers: number; totalSockets: number }> {
    return this.gateway.getStats();
  }
}
