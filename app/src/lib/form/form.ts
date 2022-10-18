export const constructCheckboxListProp = (name: string, values: string[]) => {
  const ret :CheckboxListProp = {
    name,
    values,
    checked: [...Array(values.length).map(() => "")]
  }
  return ret;
};