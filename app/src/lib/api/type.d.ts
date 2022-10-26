interface DatasetStatus {
  isOpen: boolean;
}

// firestore の map は key でソートするみたいなので頑張る
type AnnotationCounts = Map<string, number>;

interface AnnotationCountsDoc {
  annotationCounts: AnnotationCounts;
}

// ミリ秒で持つ
// TODO: いい名前思いついたら変える
type AnnotationLogData = Map<string, {displayName: string, timestamp: number}>;

interface AnnotationLogDataDoc {
  annotationLogData: AnnotationLogData;
  ngListData: AnnotationLogData;
}

interface AnnotationLog {
  uid: string;
  log: AnnotationLogData;
  ngList: AnnotationLogData;
}

interface NGDataLog {
  userId: string,
  displayName: string,
  dataId: string,
  timestamp: number,
}

interface DBData {
  [key: string]: unknown
}
