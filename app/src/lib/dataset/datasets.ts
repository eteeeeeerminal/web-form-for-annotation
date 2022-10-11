import { vtuberIds } from '../vtuber-onomatopoeia/dataset/database';
import dsjson from './datasets.json';

export const datasets: DatasetMeta[] = dsjson;

export const datasetDataIds = {
  "vtuber-onomatopoeia": vtuberIds
} as DatasetDataIds;
