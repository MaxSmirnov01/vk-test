import { Group } from './api';

export interface State {
  data: Group[];
  filters: { closed: string; avatar_color: string; friends: string };
  selectedGroupId: null | number;
  status: string;
  error: null | string;
}

export interface Filter {
  [key: string]: string;
}
