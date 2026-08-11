import type { DemoActivity, DemoClient, DemoMetric, DemoTask } from '@/types/demo';

export const demoMetrics: DemoMetric[] = [
  { id: 'assets', label: 'Assets tracked', value: '$2.4M', delta: '+12%' },
  { id: 'clients', label: 'Active clients', value: '48', delta: '+6' },
  { id: 'reviews', label: 'Reviews due', value: '7', delta: 'This week' },
];

export const demoClients: DemoClient[] = [
  {
    id: 'client-001',
    name: 'Apex Manufacturing',
    segment: 'Operating business',
    balance: '$840K',
    status: 'Active',
  },
  {
    id: 'client-002',
    name: 'Northstar Holdings',
    segment: 'Family office',
    balance: '$1.1M',
    status: 'Review',
  },
  {
    id: 'client-003',
    name: 'Riverbend Retail',
    segment: 'Growth portfolio',
    balance: '$460K',
    status: 'Pending',
  },
];

export const demoTasks: DemoTask[] = [
  {
    id: 'task-001',
    title: 'Confirm risk profile updates',
    owner: 'Relationship team',
    due: 'Today',
    priority: 'High',
  },
  {
    id: 'task-002',
    title: 'Prepare quarterly review pack',
    owner: 'Advisory desk',
    due: 'Tomorrow',
    priority: 'Medium',
  },
  {
    id: 'task-003',
    title: 'Send onboarding checklist',
    owner: 'Operations',
    due: 'Friday',
    priority: 'Low',
  },
];

export const demoActivity: DemoActivity[] = [
  {
    id: 'activity-001',
    title: 'Portfolio note added',
    detail: 'Apex Manufacturing received a new cashflow forecast.',
    time: '10:30 AM',
  },
  {
    id: 'activity-002',
    title: 'Review scheduled',
    detail: 'Northstar Holdings is ready for advisor review.',
    time: '9:15 AM',
  },
  {
    id: 'activity-003',
    title: 'Checklist shared',
    detail: 'Riverbend Retail onboarding tasks were updated.',
    time: 'Yesterday',
  },
];
