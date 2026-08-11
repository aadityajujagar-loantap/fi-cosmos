import { demoActivity, demoClients, demoMetrics, demoTasks } from '@/mocks/demo-data';

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const demoApi = {
  async getDashboard() {
    await wait();

    return {
      metrics: demoMetrics,
      clients: demoClients,
      activity: demoActivity,
    };
  },

  async getTasks() {
    await wait();

    return demoTasks;
  },
};
