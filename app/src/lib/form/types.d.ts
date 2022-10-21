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
  checked?: string
}

interface CheckboxListProp {
  name: string,
  values: string[],
  checked: string[]
}

interface RadioButtonProp {
  name: string;
  values: string[];
  selected?: string;
  doNewLine?: boolean;
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

interface FormPropWithQuestion<T = CheckboxListProp| RadioButtonProp | SelectProp | NPointProp> {
  question: string;
  prop: T;
}
