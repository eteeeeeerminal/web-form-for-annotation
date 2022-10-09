interface DatasetMeta {
  name: string,
  datasetId: string,
}

declare module '*/datasets.json' {
  const value: DatasetMeta[]
  export = value
}
