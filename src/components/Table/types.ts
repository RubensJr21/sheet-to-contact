import { Dispatch, SetStateAction } from "react"

export type ItemHead = string

export interface ItemBody {
	[key: string]: string,
}

// example
const Table: ITable = {
	head: ["coluna 1", "coluna 2", "numero"],
	body: [
		{
			"coluna 1": "registro[1,1]",
			"coluna 2": "registro[1,2]",
			"numero": "registro[1,3]",
		},
		{
			"coluna 1": "registro[2,1]",
			"coluna 2": "registro[2,2]",
			"numero": "registro[2,3]",
		},
		{
			"coluna 1": "registro[3,1]",
			"coluna 2": "registro[3,2]",
			"numero": "registro[3,3]",
		},
		{
			"coluna 1": "registro[4,1]",
			"coluna 2": "registro[4,2]",
			"numero": "registro[4,3]",
		}
	]
}

export interface ITable {
	head: Array<ItemHead>,
	body: Array<ItemBody>,
}

export interface ITableContext {
	dataTable: ITable,
	setDataTable: Dispatch<SetStateAction<ITable>>
}