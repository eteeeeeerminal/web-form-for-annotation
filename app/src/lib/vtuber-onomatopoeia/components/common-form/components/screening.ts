// スクリーニングの条件
export const screen = (data: DBData) => {
  if (data["watchFrequency"] == null) return false;
  if (data["watchFrequency"] == "") return false;
  if (data["watchFrequency"] == "2週間に1回以下") return false;
  return true;
}