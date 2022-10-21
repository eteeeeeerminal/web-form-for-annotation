import { constructCheckboxListProp } from "$lib/form/form";

export const watchFrequencyQ = "VTuberをどのくらいの頻度で視聴しますか?";
export const watchFrequency: SelectProp = {
  name: "watchFrequency",
  values: [
    "2週間に1回以下",
    "週1回",
    "週2,3回",
    "2日に1回",
    "毎日"
  ],
  selected: '',
};

export const manyVWatchQ = "チャンネル登録している、もしくは、定期的に視聴しているVTuberは何人ですか?";
export const manyVWatch: SelectProp = {
  name: "manyVWatch",
  values: [
    "いない",
    "1~4人程度",
    "5~10人程度",
    "10~30人程度",
    "30~50人程度",
    "50人~"
  ],
  selected: '',
};

export const watchPeriodQ = "初めてVTuberの動画を視聴してからどれくらい経ちますか?";
export const watchPeriod: SelectProp = {
  name: "watchPeriod",
  values: [
    "~1ヶ月",
    "1ヶ月~半年",
    "半年~1年",
    "1年~1年半",
    "1年半~2年",
    "2年~"
  ],
  selected: '',
};

export const sex: SelectProp = {
  name: "sex",
  values: [
    "男性",
    "女性",
    "その他",
    "回答したくない"
  ],
  selected: '',
}

export const age: SelectProp = {
  name: "age",
  values: [
    "10代",
    "20代",
    "30代",
    "40代",
    "50代",
    "60代以上"
  ],
  selected: '',
}

const platformCheckValues = [
  "YouTube",
  "NicoNico動画",
  "Twitch",
  "BiliBili動画",
  "TikTok",
  "その他の動画プラットフォーム",
  "動画はほとんど視聴しない"
];

export const platformCheck: FormPropWithQuestion<CheckboxListProp> = {
  question: "この中で1週間に1度以上使うものをチェックしてください。",
  prop: constructCheckboxListProp('platformCheck', platformCheckValues)
};

const snsCheckValues = [
  "Twitter",
  "Facebook",
  "Instagram",
  "VRChat等のVRSNS",
  "その他のSNS",
  "SNSは殆ど使わない"
];

export const snsCheck: FormPropWithQuestion<CheckboxListProp> = {
  question: "この中で1週間に1度以上使うものをチェックしてください。",
  prop: constructCheckboxListProp('snsCheck', snsCheckValues)
};
