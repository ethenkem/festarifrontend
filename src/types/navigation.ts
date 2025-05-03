export type ServiceActivity = {
  title: string;
  description?: string;
  icon?: string;
  path?: string;
};

export type ServiceCategory = {
  title: string;
  description: string;
  activities: ServiceActivity[];
  path: string;
};
