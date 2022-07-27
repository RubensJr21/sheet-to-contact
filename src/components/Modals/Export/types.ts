export type ColunaType = [
	number,
	string,
	boolean
]

export type ColunaContextType = {
	colunas: Array<ColunaType>,
	setColunas: CallableFunction
}