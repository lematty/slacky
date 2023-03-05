import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';

import { SlackChannel } from './models/channels';

dotenv.config();

const web = new WebClient(process.env.SLACK_TOKEN);

export async function sendEventToSlack(channel: SlackChannel, text: string) {
  try {
    await web.chat.postMessage({
      channel: `#${channel}`,
      text,
    });
    console.log('Message posted!');
  } catch (error) {
    console.log(error);
  }
}
