import { database } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { datasetDataIds } from "$lib/dataset/datasets";

// storeで実装でしょ 無理そうならsingletonしませう
// ↑いやいうほど読み書き発生しないから不要かも。過剰

const annotationProgress = "annotation-progress";

export const checkIsAdmin = async (uid: string) => {
  const docRef = doc(database, "admin", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const isAdmin = docSnap.data().isAdmin;
    if (typeof isAdmin == "boolean") {
      return isAdmin
    }
  }
  return false;
}

export const updateDataset = async (datasetId: string) => {
  // なければ作成
  const docRef = doc(database, datasetId, annotationProgress);
  // TODO: ids が存在しないときの処理を書く
  const ids = datasetDataIds[datasetId];

  const currentCounts = await getAnnotationCounts(datasetId);

  const docData = new Map() as AnnotationCounts;
  ids.forEach((id) => { docData.set(id, 0) });
  if (currentCounts != null) {
    ids.forEach((id) => {
      const count = currentCounts.get(id);
      if (count) {
        docData.set(id, count);
      }
    })
  }

  await setDoc(docRef, { getAnnotationCounts: Object.fromEntries(docData) });
}

export const existsAnnotationCounts = async (datasetId: string) => {
  const docRef = doc(database, datasetId, annotationProgress);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export const getAnnotationCounts = async (datasetId: string) => {
  const docRef = doc(database, datasetId, annotationProgress);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { annotationCounts } = docSnap.data() as AnnotationCountsDoc;
    return annotationCounts;
  }
}

