import { datasetMetas } from "$lib/dataset/datasets";
import { targetVtubers } from "./static-data";

export const datasetId = "vtuber-onomatopoeia";
export const datasetVersion = datasetMetas[datasetId].version;

export const vtuberIds = Object.keys(targetVtubers);

const randomPick = (array: Array<string>) => {
  const randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex];
};

export const randomPickVtuber = () => randomPick(vtuberIds);

// まだ回答していないもの ∧ なるべく他の人が回答していないもの からランダムピック
export const pickVtuber = (annotationLog: AnnotationLog | null, annotationCounts: AnnotationCounts | null) => {
  if (annotationLog == null) return null;
  if (annotationCounts == null) return null;
  let targetDataIds: string[] = [];
  const maxCount = [...annotationCounts].slice(-1)[0][1];

  for (let i = 0; i <= maxCount; i++) {
    // 回答数の少ない項目
    targetDataIds = [...annotationCounts].filter((value) => (value[1] === i)).map(value=>value[0]);

    const yetNotAnsPool = targetDataIds
      .filter(id => !annotationLog.log.has(id))
      .filter(id => !annotationLog.ngList.has(id));
    if (yetNotAnsPool.length < 1) {
      continue;
    }
    const picked = randomPick(yetNotAnsPool);
    if (picked) return picked;
  }
  return null;
};

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
