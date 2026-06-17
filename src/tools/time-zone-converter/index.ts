import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Time zone converter',
  path: '/time-zone-converter',
  description: 'Convert a date and time between Israel, Bangalore, and Netherlands timezones.',
  keywords: ['time', 'timezone', 'convert', 'Israel', 'Bangalore', 'Netherlands', 'Amsterdam', 'CET', 'IST', 'clock'],
  component: () => import('./time-zone-converter.vue'),
  redirectFrom: ['/time'],
  icon: ArrowsShuffle,
  createdAt: new Date('2026-05-24'),
});