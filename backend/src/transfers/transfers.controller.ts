import {
  Controller,
  NotImplementedException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { RequirePin } from '../pin/decorators/require-pin.decorator';
import { PinGuard } from '../pin/guards/pin.guard';

type AuthenticatedRequest = Request & { user: User };

@ApiTags('transfers')
@ApiBearerAuth()
@Controller('transfers')
export class TransfersController {
  @Post()
  @RequirePin()
  @UseGuards(PinGuard)
  @ApiHeader({
    name: 'X-Transaction-Pin',
    description: '4-digit transaction PIN',
    required: true,
  })
  @ApiOperation({ summary: 'Create a transfer (placeholder)' })
  @ApiResponse({ status: 501 })
  transfer(@Req() _req: AuthenticatedRequest): never {
    throw new NotImplementedException('Transfers are not implemented yet');
  }
}
