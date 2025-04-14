import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';  // Import WebClient from Slack API
import { ConfigService } from '@nestjs/config';  // To read environment variables

@Injectable()
export class StatusService {
  private slackClient: WebClient;
  private userIds: string[];

  constructor(private configService: ConfigService) {
    // Initialize Slack client with the Slack bot token from environment variables
    this.slackClient = new WebClient(this.configService.get<string>('SLACK_BOT_TOKEN'));

    // Fetch user IDs from environment variables without fallback values
    const Aaron = this.configService.get<string>('AARON');
    const Sushma = this.configService.get<string>('SUSHMA');
    const Tanuja = this.configService.get<string>('TANUJA');
    const Carmen = this.configService.get<string>('CARMEN');
    const Joe = this.configService.get<string>('JOE');
    const Crystal = this.configService.get<string>('CRYSTAL');
    const Fabi = this.configService.get<string>('FABI');
    const Sonia = this.configService.get<string>('SONIA');
    const Chris = this.configService.get<string>('CHRIS');
    const Cesar = this.configService.get<string>('CESAR');
    const Amanda = this.configService.get<string>('AMANDA');

    // Check if user IDs are defined, throw an error if any of them are missing
    if (!Aaron || !Sushma || !Tanuja || !Carmen || !Joe || !Crystal || !Fabi || !Sonia || !Chris || !Cesar || !Amanda) {
      throw new Error('Missing one or more Slack user IDs in the environment variables');
    }

    // Assign the fetched user IDs to the array
    this.userIds = [Aaron, Sushma, Tanuja, Carmen, Joe, Crystal, Fabi, Sonia, Chris, Cesar, Amanda];
  }

  // Fetch user data from Slack API using environment-stored user IDs
  async getUsersInfo() {
    const usersInfo: any[] = [];
  
    for (const userId of this.userIds) {
      try {
        const userRes = await this.slackClient.users.info({ user: userId });
        const presenceRes = await this.slackClient.users.getPresence({ user: userId });
  
        if (userRes.user && userRes.user.profile) {
          usersInfo.push({
            id: userRes.user.id,
            real_name: userRes.user.real_name,
            image: userRes.user.profile.image_192,
            presence: presenceRes.presence, // 'active' or 'away'
          });
        }
      } catch (error) {
        console.error(`Error fetching info for user ${userId}:`, error);
      }
    }
  
    return usersInfo;
  }  
}
