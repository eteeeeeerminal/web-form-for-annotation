import { targetVtubers } from "./static-data";

export const datasetId = "vtuber-onomatopoeia";

export const vtuberIds = Object.keys(targetVtubers);

const randomPick = (array: Array<string>) => {
  const randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex];
};

export const pickVtuber = () => randomPick(vtuberIds);

export const loadVtuberData = (vtuberId: string) => {
  const vtuber = targetVtubers[vtuberId];
  return {
    videoId: vtuber.youtube.target_video.video_id,
    title: vtuber.youtube.target_video.title,
    uploaderName: vtuber.youtube.name,
    youtubeId: vtuber.youtube.channel_id,
    description: vtuber.youtube.target_video.description
  } as YouTubeVideoProp;
}
