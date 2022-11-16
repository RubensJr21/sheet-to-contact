import { Dispatch, SetStateAction } from "react"

export type ItemHead = string

export interface ItemBody {
	[key: string]: string,
}

export interface ITable {
	head: Array<ItemHead>,
	body: Array<ItemBody>,
}

export interface ITableContext {
	dataTable: ITable,
	changeTable: (newState: ITable) => {}
}