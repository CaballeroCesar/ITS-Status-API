import { Controller, Get, Query } from '@nestjs/common';
import { StatusService } from '../services/status.service';

@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) {}

    // Route to fetch information for a specific user
    @Get('slack/user')
    async getUserInfo(@Query('userId') userId: string) {
        const userInfo = await this.statusService.getUserInfo(userId);
        if (userInfo) {
            return userInfo;  
        } else {
            return { message: 'User not found or error fetching user information' };
        }
    }
}
