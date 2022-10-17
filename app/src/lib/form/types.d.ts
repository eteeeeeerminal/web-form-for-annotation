interface YouTubeVideoProp {
  videoId: string,
  title: string,
  uploaderName: string;
  youtubeId: string;
  description: string;
}

interface CheckboxProp {
  name: string,
  value: string,
  initStat: string[] | undefined
}

interface RadioButtonProp {
  name: string;
  values: string[];
  initStat: string | undefined;
  doNewLine: boolean;
}

interface SelectProp {
  name: string;
  values: string[];
  selected: string | undefined;
}

interface NPointProp {
  name: string;
  n: number;
  leftWord: string;
  rightWord: string;
  selected: string | undefined;
}
