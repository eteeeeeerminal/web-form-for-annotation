interface DatasetMeta {
  name: string,
  datasetId: string,
  version: string,
}

declare module '*/datasets.json' {
  const value: DatasetMeta[]
  export = value
}
