import { DateType, CPI_DATES, EventTime, EventType, JOLTS_DATES, PPI_DATES } from './models';
import { sendEventToSlack } from '../slack-stuff/send-to-channel';
import { SlackChannel } from '../slack-stuff/models/channels';

const ONE_MINUTE = 60000;
const FIVE_MINUTES = ONE_MINUTE * 5;

console.log('Application running');

// check for event every 5 minutes
setInterval(async () => {
  await checkForEventTime('CPI', CPI_DATES, { hour: 8, minute: 30 });
  await checkForEventTime('PPI', PPI_DATES, { hour: 8, minute: 30 });
  await checkForEventTime('JOLTS', JOLTS_DATES, { hour: 10, minute: 0 });
}, FIVE_MINUTES);

async function checkForEventTime(eventType: EventType, dates: DateType[], time: EventTime) {
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const isEventTime = currentHour === time.hour && currentMinute > time.minute && currentMinute < time.minute + 10;

  console.log('Checking dates & times', new Date().toTimeString());
  for (const date of dates) {
    const isEventDay = currentMonth === date.month && currentDay === date.day;
    if (isEventDay && isEventTime) {
      console.log({ currentTime: new Date().toTimeString() });
      const text = `${eventType} event today at ${time.hour}:${time.minute}am`;
      await sendEventToSlack(SlackChannel.EconomicEvents, text);
    }
  }
}
