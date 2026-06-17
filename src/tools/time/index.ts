import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Time',
  path: '/time',
  description: 'Convert a date and time between Israel, Bangalore, and Netherlands timezones.',
  keywords: ['time', 'timezone', 'convert', 'Israel', 'Bangalore', 'Netherlands', 'Amsterdam', 'CET', 'IST', 'clock'],
  component: () => import('./time.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2026-05-24'),
});