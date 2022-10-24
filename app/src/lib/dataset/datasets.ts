import dsjson from './datasets.json';

export const datasetMetas = Object.fromEntries(
  dsjson.map(value => ([value["datasetId"], value]))
);
export const datasets: DatasetMeta[] = dsjson;

