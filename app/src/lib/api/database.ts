import { database } from "./firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { datasetDataIds } from "$lib/dataset/dataset-data-ids";

const datasetColName = "datasets";
const commonDataColName = "common";
const usersDataColName = "users";
const annotationProgressDocName = "progress";
const logColName = "log";
const annotationLogDocName = "log";
const datasetStatusDocName = "status";

// 昇順
export const sortedMap = (map: Map<string, number>, isAsc = true) => {
  const arr = [...map];
  if (isAsc) {
    arr.sort((a, b) => (a[1] - b[1]));
  } else {
    arr.sort((a, b) => (b[1] - a[1]));
  }
  return new Map(arr);
}

export const sortedAnnotationCounts = (annotationCounts: AnnotationCounts, isAsc = true) => {
  return sortedMap(annotationCounts, isAsc) as AnnotationCounts;
}

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
  const docRef = doc(database, datasetColName, datasetId, commonDataColName, annotationProgressDocName);
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

  await setDoc(docRef, { annotationCounts: Object.fromEntries(docData) });
}

export const setDatasetStatus = async (datasetId: string, datasetStatus: DatasetStatus) => {
  const docRef = doc(database, datasetColName, datasetId, commonDataColName, datasetStatusDocName);
  await setDoc(docRef, datasetStatus);
}

export const getDataSetStatus = async (datasetId: string) => {
  const docRef = doc(database, datasetColName, datasetId, commonDataColName, datasetStatusDocName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as DatasetStatus;
  }

  return null;
}

export const existsAnnotationCounts = async (datasetId: string) => {
  const docRef = doc(database, datasetColName, datasetId, commonDataColName, annotationProgressDocName);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export const getAnnotationCounts = async (datasetId: string) => {
  const docRef = doc(database, datasetColName, datasetId, commonDataColName, annotationProgressDocName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { annotationCounts } = docSnap.data() as AnnotationCountsDoc;
    return sortedAnnotationCounts(new Map(Object.entries(annotationCounts)));
  }

  return null;
}

export const setAnnotationCounts = async (datasetId: string, annotationCounts: AnnotationCounts) => {
  const docRef = doc(database, datasetColName, datasetId, commonDataColName, annotationProgressDocName);
  await setDoc(docRef, {annotationCounts: Object.fromEntries(annotationCounts)});
}


// 降順(更新日時が最近のものが最初に)
export const sortedAnnotationLog = (annotationLog: AnnotationLogData, isAsc = false) => {
  const arr = [...annotationLog];
  if (isAsc) {
    arr.sort((a, b) => (a[1].timestamp - b[1].timestamp));
  } else {
    arr.sort((a, b) => (b[1].timestamp - a[1].timestamp));
  }
  return new Map(arr);
}

// 返り値は降順にソートされたmap
export const getAnnotationLog = async (datasetId: string, uid: string) => {
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid, logColName, annotationLogDocName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const annotationLogDataDoc = docSnap.data() as AnnotationLogDataDoc;

    return {
      log: sortedAnnotationLog(new Map(Object.entries(annotationLogDataDoc.annotationLogData))),
      ngList: new Map(Object.entries(annotationLogDataDoc.ngListData))
    }
  }

  return null;
}

export const setAnnotationLog = async (datasetId: string, uid: string, annotationLog: AnnotationLog) => {
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid, logColName, annotationLogDocName);
  await setDoc(docRef, {
    annotationLogData: Object.fromEntries(annotationLog.log),
    ngListData: Object.fromEntries(annotationLog.ngList)
  });
}

export const getAnnotation = async (datasetId: string, uid: string, dataId: string) => {
  const docRef = doc(database, datasetId, "users", uid, dataId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as DBData;
  }
  return null;
}

export const setAnnotation = async (datasetId: string, uid: string, dataId: string, data: unknown) => {
  const docRef = doc(database, datasetId, "users", uid, dataId);
  await setDoc(docRef, data);
}

export const deleteAnnotation = async (datasetId: string, uid: string, dataId: string) => {
  const docRef = doc(database, datasetId, "users", uid, dataId);
  await deleteDoc(docRef);
}