// firestore の map は key でソートするみたいなので頑張る
type AnnotationCounts = Map<string, number>;

interface AnnotationCountsDoc {
  annotationCounts: AnnotationCounts;
}

// ミリ秒で持つ
// TODO: いい名前思いついたら変える
type AnnotationLogData = Map<string, number>;

interface AnnotationLogDataDoc {
  annotationLogData: AnnotationLogData;
}

interface AnnotationLog {
  uid: string;
  log: AnnotationLogData;
}
