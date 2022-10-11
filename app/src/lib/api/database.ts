import { database } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
// storeで実装でしょ 無理そうならsingletonしませう
// ↑いやいうほど読み書き発生しないから不要かも。過剰
export const existsAnnotationCounts = async (datasetId: string) => {
  const docRef = doc(database, datasetId, "annotation-progress");
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}
