import { Dispatch, SetStateAction } from "react"

export type ColunaType = [
	number,
	string,
	boolean
]

export type ColunaContextType = {
	colunas: Array<ColunaType>,
	setColunas: CallableFunction
}

export type PrefixContextType = {
	prefix: string,
	setPrefix: Dispatch<SetStateAction<string>>
}