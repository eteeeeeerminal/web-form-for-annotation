import { targetVtubers } from "./static-data";

export const datasetId = "vtuber-onomatopoeia";

export const vtuberIds = Object.keys(targetVtubers);

const randomPick = (array: Array<string>) => {
  const randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex];
};

export const pickVtuber = () => randomPick(vtuberIds);
