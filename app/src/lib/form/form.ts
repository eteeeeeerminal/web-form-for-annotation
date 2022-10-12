export const itemsToCheckboxProps = (namePrefix: string, values: string[]) => {
  if (values.length == 1) {
    return [{ name: namePrefix, value: values[0] } as CheckboxProp];
  }

  return values.map((v, i) => {
    return {name: namePrefix+"."+i, value: v} as CheckboxProp
  })
};