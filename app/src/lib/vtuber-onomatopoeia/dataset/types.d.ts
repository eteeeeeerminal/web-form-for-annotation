interface YouTubeVideoData {
  video_id: string
  title: string
  description: string
  timestamp: string
}
interface YouTubeDatasetItem {
  channel_id: string
  name: string
  target_video: YouTubeVideoData
}
interface VTuberDatasetItem {
  vtuber_id: string
  create_at: string
  youtube: YouTubeDatasetItem
}

declare module '*/vtuber-dataset.json' {
  const value: VTuberDatasetItem[]
  export = value
}