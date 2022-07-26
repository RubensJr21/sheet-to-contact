export type ColunaType = [
	number,
	string
]

export type ColunaContextType = {
	colSelect: Array<ColunaType>,
	setColSelect: CallableFunction
}