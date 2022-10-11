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

interface ConsentFormValue {
  checkedElements: string[],
  hasConsented: boolean,
}

interface RewardFormValue {
  name: string,
  email: string,
}

interface AnnotatorFormValue {
  watchingFrequency: string,
  watchingVNum: string,
  watchingPeriod: string,
  sex: string,
  age: string,
  usingVideoPlatform: string[],
  usingSNS: string[],
}

interface CommonFormValue {
  version: string,
  consentFormValue: ConsentFormValues,
  rewardFormValue: RewardFormValue,
  annotatorFormValue: AnnotatorFormValue
}

interface VTuberOtherFormValue {
  alreadyKnow: string,
}

interface VTuberOnomatopoeiasFormValue {
  firstOnomatopoeia: string,
  otherOnomatopoeias: string,
  otherFeatures: string,
}

type SevenPoint = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface VPersonalityQuestionnaire {
  extroverted: SevenPoint,
  critical: SevenPoint,
  dependable: SevenPoint,
  anxious: SevenPoint,
  open: SevenPoint,
  reserved: SevenPoint,
  sympathetic: SevenPoint,
  disorganized: SevenPoint,
  calm: SevenPoint,
  conventional: SevenPoint,
}

interface VTuberFormValue {
  version: string,
  vOtherFormValue: VTuberOtherFormValue,
  vOnomatopoeiasFormValue: VTuberOnomatopoeiasFormValue,
  vPersonalityQ: VPersonalityQuestionnaire,
}
