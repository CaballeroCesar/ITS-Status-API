import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class StatusService {
    private slackClient: WebClient;

    constructor() {
        this.slackClient = new WebClient(process.env.SLACK_BOT_TOKEN); 
    }

    // Get information about a specific Slack user by ID
    async getUserInfo(userId: string) {
        try {
            const response = await this.slackClient.users.info({ user: userId });
            return response.user; // Returns the user information
        } catch (error) {
            console.error('Error fetching user info:', error);
            return { success: false, error: error.message };
        }
    }
}
