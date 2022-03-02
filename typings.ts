export interface Props {
  rows: number
  cols: number
  title: string
  detail: string
  timestamp: string
  position: [number, number]
  homework: Homework[]
}

export interface Homework {
  title: string
  desc: string
  completed: boolean
}

export interface TableType {
  title: string
  details: string
  id: string
  dimensions: { rows: number; cols: number }
  timestamp: { seconds: string; nanoseconds: string }
}
