// annotationCounts 自体は 特定ユーザのデータじゃないので UserData ではない
// TODO: rename

import { writable, type Readable } from 'svelte/store';

import { currentUser } from '$lib/api/auth';
import { getAnnotation, getAnnotationCounts, getAnnotationLog, setAnnotation, setAnnotationCounts, setAnnotationLog, sortedAnnotationCounts, sortedAnnotationLog } from '$lib/api/database';
import { datasets } from './datasets';

const createUserData = (datasetId: string) => {
  const annotationLog = writable<AnnotationLog | null>(null);
  const annotationCounts = writable<AnnotationCounts | null>(null);

  currentUser.subscribe(async user => {
    if (user) {
      annotationCounts.set(await getAnnotationCounts(datasetId));

      const log = await getAnnotationLog(datasetId, user.uid);
      if (log == null) {
        annotationLog.set({ uid: user.uid, log: new Map() });
      } else {
        annotationLog.set({ uid: user.uid, log: log })
      }
    } else {
      annotationCounts.set(null);
      annotationLog.set(null);
    }
  })

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

      log.log.set(dataId, timestamp);
      setAnnotationLog(datasetId, log.uid, log.log);
      log.log = sortedAnnotationLog(log.log);

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

  return {
    annotationLog: { subscribe: annotationLog.subscribe } as Readable<AnnotationLog | null>,
    annotationCounts: { subscribe: annotationCounts.subscribe } as Readable<AnnotationCounts | null>,
    submit,
    getFormValue,
  }
}

const userData = Object.fromEntries(
  datasets.map(({ datasetId }) => ([datasetId, createUserData(datasetId)]))
);

export const getUserData = (datasetId: string) => userData[datasetId];
