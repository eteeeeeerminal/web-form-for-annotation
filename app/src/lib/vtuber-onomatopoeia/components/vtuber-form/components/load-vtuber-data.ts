import { targetVtubers } from '$lib/vtuber-onomatopoeia/dataset/static-data';

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