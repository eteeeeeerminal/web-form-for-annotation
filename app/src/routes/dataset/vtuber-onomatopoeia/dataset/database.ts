import { targetVtubers } from "./static-data";

const vtuberIds = Object.keys(targetVtubers);

const randomPick = <T>(array: Array<T>) => {
  const randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex]
};

export const pickVtuber = () => targetVtubers[randomPick(vtuberIds)];
