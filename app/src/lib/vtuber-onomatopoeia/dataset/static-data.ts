import staticVtuberDataset from './vtuber-dataset.json';

export const targetVtubers: { [key: string]: VTuberDatasetItem } = Object.assign(
  {}, ...staticVtuberDataset.map((x) => ({ [x.vtuber_id]: x }))
)
