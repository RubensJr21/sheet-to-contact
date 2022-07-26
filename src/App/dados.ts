import { ITable, ItemBody, ItemHead } from '../components/Table/types'

// gera número entre 0 e 4, somando mais 1 fica entre 1 e 5
const qtdColunas = Math.floor(Math.random() * 4) + 1
// gera número entre 0 e 15, somando mais 1 fica entre 1 e 16
const qtdRegistros = Math.floor(Math.random() * 15) + 1

const _head: Array<ItemHead> = []
const _body: Array<ItemBody> = []

for (let index = 1; index < qtdColunas + 1; index++) {
    _head.push(`Coluna ${index}`)
}

const descriptorBase = {
    configurable: true,
    enumerable: true,
    writable: true,
}

for (let indexR = 0; indexR < qtdRegistros; indexR++) {
    _body.push({} as ItemBody)
    for (let indexC = 0; indexC < qtdColunas; indexC++) {

        Object.defineProperty(_body[indexR], `${_head[indexC]}`, {
            ...descriptorBase,
            value: `Item[${indexR + 1},${indexC + 1}]`
        })
    }
}
// console.log(_body)

export const DataTable: ITable = {
    head: _head,
    body: _body
}