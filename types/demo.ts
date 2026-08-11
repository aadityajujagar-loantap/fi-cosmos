export type DemoMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
};

export type DemoClient = {
  id: string;
  name: string;
  segment: string;
  balance: string;
  status: 'Active' | 'Review' | 'Pending';
};

export type DemoTask = {
  id: string;
  title: string;
  owner: string;
  due: string;
  priority: 'High' | 'Medium' | 'Low';
};

export type DemoActivity = {
  id: string;
  title: string;
  detail: string;
  time: string;
};
