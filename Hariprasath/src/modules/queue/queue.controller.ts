import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QueueEngineService } from './queue.service';
import { JoinQueueDto } from './queue.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
    constructor(private readonly queueService: QueueEngineService) { }

    @Post('join')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Join a queue' })
    async joinQueue(@Request() req: any, @Body() dto: JoinQueueDto) {
        return this.queueService.joinQueue(req.user.id, dto);
    }

    @Get('status/:tokenId')
    @ApiOperation({ summary: 'Get status of a token' })
    async getStatus(@Param('tokenId') tokenId: string) {
        return this.queueService.getQueueStatus(tokenId);
    }
}
