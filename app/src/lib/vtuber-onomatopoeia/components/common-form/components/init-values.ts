export const constructStringArray= (l: number) => ([...Array(l)].map(() => ""))

export const commonFormInitValues = {
  consentCheck: constructStringArray(9),
  consentRadio: "",
  name: "",
  email: "",
  watchFrequency: "",
  manyVWatch: "",
  watchPeriod: "",
  sex: "",
  age: "",
  platformCheck: constructStringArray(7),
  snsCheck: constructStringArray(6)
}