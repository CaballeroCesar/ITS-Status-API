import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api'; 
import { ConfigService } from '@nestjs/config'; 

export interface SlackUserInfo {
  id: string;
  real_name: string;
  image: string;
  presence: string;
  status_text?: string;
  status_emoji?: string;
  huddle_state?: string;
}

@Injectable()
export class StatusService {
  private slackClient: WebClient;

  constructor(private configService: ConfigService) {
    this.slackClient = new WebClient(this.configService.get<string>('SLACK_BOT_TOKEN'));
  }

  public async getUsersInfo() {
    try {
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

      if (!Aaron || !Sushma || !Tanuja || !Carmen || !Joe || !Crystal || !Fabi || !Sonia || !Chris || !Cesar || !Amanda) {
        throw new Error('Missing one or more Slack user IDs');
      }

      const userIds = [Aaron, Sushma, Tanuja, Carmen, Joe, Crystal, Fabi, Sonia, Chris, Cesar, Amanda]; 

      const usersInfo: SlackUserInfo[] = [];

      for (const userId of userIds) {
          const userRes = await this.slackClient.users.info({ user: userId });
          const presenceRes = await this.slackClient.users.getPresence({ user: userId });

          if (
            userRes.user &&
            userRes.user.id &&
            userRes.user.real_name &&
            userRes.user.profile &&
            userRes.user.profile.image_192 &&
            presenceRes.presence
          ) {
            usersInfo.push({
              id: userRes.user.id,
              real_name: userRes.user.real_name,
              image: userRes.user.profile.image_192,
              presence: presenceRes.presence,
              status_text: userRes.user.profile.status_text,
              status_emoji: userRes.user.profile.status_emoji,
              huddle_state: userRes.user.profile.huddle_state,
            });
          } else {
            console.warn(`Invalid user data for ID ${userId}`);
            continue;
          }
      }
    
      return usersInfo;

    } catch (error) {
        console.error(error)
        return error;
    }
  }  
}
