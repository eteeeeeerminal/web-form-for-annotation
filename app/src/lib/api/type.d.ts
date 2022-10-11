// firestore の map は key でソートするみたいなので頑張る
type AnnotationCounts = Map<string, number>;

interface AnnotationCountsDoc {
  annotationCounts: AnnotationCounts;
}

// ミリ秒で持つ
type AnnotationLog = Map<string, number>;

interface AnnotationLogDoc {
  annotationLog: AnnotationLog;
}
