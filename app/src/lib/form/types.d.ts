interface CheckboxProp {
  name: string,
  value: string,
  initStat: string | undefined
}

interface RadioButtonProp {
  name: string;
  values: string[];
  initStat: string | undefined;
  doNewLine: boolean;
}
