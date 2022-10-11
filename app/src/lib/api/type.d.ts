// firestore の map は key でソートするみたいなので頑張る
type AnnotationCounts = Map<string, number>;

interface AnnotationCountsDoc {
  annotationCounts: AnnotationCounts;
}

type AnnotationLog = Map<string, number>;
