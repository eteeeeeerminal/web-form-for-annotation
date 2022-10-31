import { database } from "./firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { datasetDataIds } from "$lib/dataset/dataset-data-ids";

const datasetColName = "datasets";
const commonDataColName = "common";
const usersDataColName = "users";
const annotationProgressDocName = "progress";
const datasetStatusDocName = "status";
const answersColName = "answers";

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
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid);
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
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid);
  await setDoc(docRef, {
    annotationLogData: Object.fromEntries(annotationLog.log),
    ngListData: Object.fromEntries(annotationLog.ngList)
  });
}

export const getAnnotation = async (datasetId: string, uid: string, dataId: string) => {
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid, answersColName, dataId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as DBData;
  }
  return null;
}

export const setAnnotation = async (datasetId: string, uid: string, dataId: string, data: unknown) => {
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid, answersColName, dataId);
  await setDoc(docRef, data);
}

export const deleteAnnotation = async (datasetId: string, uid: string, dataId: string) => {
  const docRef = doc(database, datasetColName, datasetId, usersDataColName, uid, answersColName, dataId);
  await deleteDoc(docRef);
}

export const getNGList = async (datasetId: string) => {
  const usersColRef = collection(database, datasetColName, datasetId, usersDataColName);
  const userDocs = await getDocs(query(usersColRef));

  const ngDataLogs: NGDataLog[] = [];
  userDocs.forEach(doc => {
    const annotationLogDataDoc = doc.data() as AnnotationLogDataDoc;
    const ngListData = new Map(Object.entries(annotationLogDataDoc.ngListData));
    ngListData.forEach((value, key) => {
      ngDataLogs.push({
        userId: doc.id,
        displayName: value.displayName,
        dataId: key,
        timestamp: value.timestamp
      });
    });
  });

  return ngDataLogs;
}

export const getAllAnnotationLogs = async (datasetId: string) => {
  const usersColRef = collection(database, datasetColName, datasetId, usersDataColName);
  const userDocs = await getDocs(query(usersColRef));

  const annotationDataLog: AnnotationDataLog[] = [];
   userDocs.forEach(doc => {
    const annotationLogDataDoc = doc.data() as AnnotationLogDataDoc;
    const annotationLogData = new Map(Object.entries(annotationLogDataDoc.annotationLogData));
    annotationLogData.forEach((value, key) => {
      annotationDataLog.push({
        userId: doc.id,
        displayName: value.displayName,
        dataId: key,
        timestamp: value.timestamp
      });
    });
  });

  return annotationDataLog;
}

// CAUTION: 大量の document にアクセスする
export const getAllAnnotations = async (datasetId: string) => {
  const annotationDataLog = await getAllAnnotationLogs(datasetId);
  const annotations = annotationDataLog.map(async (log) => {
    const content = await getAnnotation(datasetId, log.userId, log.dataId);
    const annotation: Annotation = {
      metadata: log,
      content: content,
    }
    return annotation;
  })

  return Promise.all(annotations);
}
