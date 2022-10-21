export const constructCheckboxListProp = (name: string, values: string[]) => {
  const ret :CheckboxListProp = {
    name,
    values,
    checked: [...Array(values.length).map(() => "")]
  }
  return ret;
};

export 	const checkCheckBoxLength = (v: unknown[] | undefined, min: number, max: number) => {
		if (v == null) return false;
		v = v.filter((v) => Boolean(v));
		return v.length >= min && v.length <= max;
	};
