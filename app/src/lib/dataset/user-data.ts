// annotationCounts 自体は 特定ユーザのデータじゃないので UserData ではない
// TODO: rename

import { writable, type Readable } from 'svelte/store';

import { currentUser } from '$lib/api/auth';
import { checkIsAdmin, deleteAnnotation, getAllAnnotationLogs, getAnnotation, getAnnotationCounts, getAnnotationLog, getDataSetStatus, setAnnotation, setAnnotationCounts, setAnnotationLog, setDatasetStatus, sortedAnnotationCounts, sortedAnnotationLog } from '$lib/api/database';
import { datasets } from './datasets';

const createUserData = (datasetId: string) => {
  const annotationLog = writable<AnnotationLog | null>(null);
  const annotationCounts = writable<AnnotationCounts | null>(null);
  const datasetStatus = writable<DatasetStatus | null>(null);
  const isAdmin = writable<boolean>(false);

  currentUser.subscribe(async user => {
    if (user) {
      annotationCounts.set(await getAnnotationCounts(datasetId));

      const log = await getAnnotationLog(datasetId, user.uid);
      if (log == null) {
        annotationLog.set({ uid: user.uid, log: new Map(), ngList: new Map() });
      } else {
        annotationLog.set({ uid: user.uid, log: log.log, ngList: log.ngList })
      }

      const status = await getDataSetStatus(datasetId);
      if (status == null) {
        datasetStatus.set({isOpen: false});
      } else {
        datasetStatus.set(status);
      }

      const adminFlag = await checkIsAdmin(user.uid);
      isAdmin.set(adminFlag);

    } else {
      annotationCounts.set(null);
      annotationLog.set(null);
      datasetStatus.set(null);
      isAdmin.set(false);
    }
  })

  const fetch = () => {
    const unsubscribe = annotationLog.subscribe(async log => {
      if (log == null) return;
      annotationCounts.set(await getAnnotationCounts(datasetId));

      const newerLog = await getAnnotationLog(datasetId, log.uid);
      if (newerLog == null) {
        annotationLog.set({ uid: log.uid, log: new Map(), ngList: new Map() });
      } else {
        annotationLog.set({ uid: log.uid, log: newerLog.log, ngList: newerLog.ngList })
      }
    });
    unsubscribe();
  }

  const submit = (dataId: string, displayName: string, values: unknown) => {
    annotationLog.update(log => {
      if (log == null) throw new Error("Cannot pushLog when annotationLog is null");
      if (log.log.has(dataId)) {
        // 編集
      } else {
        // 新規回答
        annotationCounts.update(count => {
          if (count == null) throw new Error("データセットが準備されていません。");
          const currentCount = count.get(dataId);
          // database 上にないものを勝手にカウントするかどうかは考慮の余地あり
          // 今のままだと, vtuber-data.json の更新が追いついてなくて
          // 余計なデータが混入していても処理できてしまう
          count.set(dataId, (currentCount) ? currentCount + 1 : 1);
          setAnnotationCounts(datasetId, count);
          return sortedAnnotationCounts(count);
        })
      }

      setAnnotation(datasetId, log.uid, dataId, values);
      log.log.set(dataId, {
        displayName,
        timestamp: Date.now()
      });
      setAnnotationLog(datasetId, log.uid, log);
      log.log = sortedAnnotationLog(log.log);

      return log;
    })
  }

  const skip = (dataId: string, displayName: string, values: unknown) => {
    annotationLog.update(log => {
      if (log == null) throw new Error("Cannot pushLog when annotationLog is null");
      if (log.log.has(dataId)) {
        // 編集
      } else {
        // 新規回答
      }

      setAnnotation(datasetId, log.uid, dataId, values);
      log.ngList.set(dataId, {
        displayName,
        timestamp: Date.now()
      });
      setAnnotationLog(datasetId, log.uid, log);
      // log.ngList = sortedAnnotationLog(log.ngList);

      return log;
    })
  }

  const getFormValue = async (dataId: string) => {
    let uid: string | undefined;
    const unsbscribe = annotationLog.subscribe(log => (uid = log?.uid));
    let formValue;
    if (uid) {
      formValue = await getAnnotation(datasetId, uid, dataId);
    }
    unsbscribe();
    return formValue;
  }

  const deleteFormValue = async (dataId: string) => {
    annotationLog.update(log => {
      if (log == null) throw new Error("Cannot pushLog when annotationLog is null");
      log.log.delete(dataId)
      setAnnotationLog(datasetId, log.uid, log);
      deleteAnnotation(datasetId, log.uid, dataId);
      return log;
    })
    annotationCounts.update(count => {
      if (count == null) throw new Error("データセットが準備されていません。");
      const currentCount = count.get(dataId);
      count.set(dataId, (currentCount) ? currentCount - 1 : 1);
      setAnnotationCounts(datasetId, count);
      return sortedAnnotationCounts(count);
    })
  }

  // admin 以外で呼び出されるとバグる
  const openDataset = async () => {
    datasetStatus.update(status => {
      if (status == null) return status;
      status.isOpen = true;
      setDatasetStatus(datasetId, status);
      return status;
    })
  }

  // admin 以外で呼び出されるとバグる
  const closeDataset = async () => {
    datasetStatus.update(status => {
      if (status == null) return status;
      status.isOpen = false;
      setDatasetStatus(datasetId, status);
      return status;
    })
  }

  // admin 専用, annotation log を全部取得してアノテーション数を数え直す
  const updateAnnotationCounts = async () => {
    let counts;
    const unsbscribe = annotationCounts.subscribe(c => counts = c);
    unsbscribe();

    if (counts == null) return null;
    const logs = getAllAnnotationLogs(datasetId);
    annotationCounts.update(counts => {
      if (counts == null) return null;
      counts.forEach((_, key) => {
        counts.set(key, 0);
      });
      return counts;
    });

    logs.then(value => {
      annotationCounts.update(counts => {
        if (counts == null) return null;
        value.forEach(log => {
          const oldC = counts.get(log.dataId)
          counts.set(log.dataId, (oldC ? oldC : 0) + 1);
        })
        setAnnotationCounts(datasetId, counts);
        return sortedAnnotationCounts(counts);
      })
    })
  }

  return {
    annotationLog: { subscribe: annotationLog.subscribe } as Readable<AnnotationLog | null>,
    annotationCounts: { subscribe: annotationCounts.subscribe } as Readable<AnnotationCounts | null>,
    datasetStatus: { subscribe: datasetStatus.subscribe } as Readable<DatasetStatus | null>,
    isAdmin: { subscribe: isAdmin.subscribe } as Readable<boolean>,
    fetch,
    submit,
    skip,
    getFormValue,
    deleteFormValue,
    openDataset,
    closeDataset,
    updateAnnotationCounts,
  }
}

const userData = Object.fromEntries(
  datasets.map(({ datasetId }) => ([datasetId, createUserData(datasetId)]))
);

export const getUserData = (datasetId: string) => userData[datasetId];

export const getAnnotationNum = (annotationLog: AnnotationLog | null) => {
  if (annotationLog == null) return 0;
  return annotationLog.log.size;
}
