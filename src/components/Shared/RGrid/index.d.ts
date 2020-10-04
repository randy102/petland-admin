import * as React from 'react'
import { ColumnType } from 'antd/lib/list'
import { ColumnsType } from 'antd/lib/table'

declare const Grid: React.FunctionComponent<GridProps>

export interface GridProps{
  data: any[]
  colDef: ColumnsType<any>
  headDef: HeaderType[]
  loading?: boolean
  expandRender?: ExpandedRowRender<RecordType>
  showSelection?: boolean
  pagination?:boolean
}

export declare type ExpandedRowRender<ValueType> = (record: ValueType, index: number, indent: number, expanded: boolean) => React.ReactNode

export interface HeaderType{
  icon: string
  name: string
  selection?: 'multiple' | 'single'
  onClick: (rows: any[]) => void
  type?: HeaderBtnType
  confirm: boolean
  confirmMessage: string
  loading: boolean
  disabled: boolean
}

export type HeaderBtnType = 'create' | 'read' | 'update' | 'delete' | 'refresh' | 'detail'

export default Grid