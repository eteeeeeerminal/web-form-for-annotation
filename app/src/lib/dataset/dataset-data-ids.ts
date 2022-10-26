import { vtuberIds, datasetId as vtuberDataset } from "$lib/vtuber-onomatopoeia/dataset/database";

export const datasetDataIds = Object.fromEntries([
  [vtuberDataset, vtuberIds],
]) as DatasetDataIds;
