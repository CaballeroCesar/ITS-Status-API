import { Controller, Get } from '@nestjs/common';
import { StatusService } from '../services/status.service';

@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  // Route to fetch information for all users
  @Get('slack/users')
  private async getUsersInfo() {
    try {
      const usersInfo = await this.statusService.getUsersInfo();
      if (usersInfo.length > 0) {
        return usersInfo; 
      } else {
        return { message: 'No user data found or error fetching user information' };
      }
    } catch (error) {
        console.error(error)
        return error;
    }
  }
}
