import { ITable, ItemBody, ItemHead } from '../components/Table/types'

const numberBetween = (floorNumber: number, topNumber: number) => {
    const numbers = Array.from({length: (topNumber + 1) - floorNumber}, (f, g) => g + floorNumber);
    const pos = Math.floor(Math.random() * numbers.length)
    return numbers[pos];
}

// gera número entre 0 e 4, somando mais 1 fica entre 1 e 5
const qtdColunas = Math.floor(Math.random() * 4) + 1
// gera número entre 0 e 15, somando mais 1 fica entre 1 e 16
const qtdRegistros = Math.floor(Math.random() * 15) + 1

const _head: Array<ItemHead> = []
const _body: Array<ItemBody> = []

const colunaDeContato = Math.floor(Math.random() * qtdColunas)

for (let index = 0; index < qtdColunas + 0; index++) {
    _head.push(index === colunaDeContato ? "número" : `Coluna ${index + 1}`)
}

const descriptorBase = {
    configurable: true,
    enumerable: true,
    writable: true,
}

for (let indexR = 0; indexR < qtdRegistros; indexR++) {
    _body.push({} as ItemBody)
    for (let indexC = 0; indexC < qtdColunas; indexC++) {
        const getPhoneNumber = (needToBeValid: boolean) => {
            const digits = numberBetween(8,9)
            const verifyNumber = (numberPhone: string, digits: number) => {
                return numberPhone.length === digits
            }
            const fixNumber = (numberPhone: string, digits: number) => {
                return `${numberPhone}${numberPhone}`.slice(0, digits)
            }
            // 10 ** digits (10^digits) representa a quantidade de cada decimais que o número terá
            // 10^2 = 100; 10^3 = 1000,..., 10^8 = 100.000.000, 10^9 = 1.000.000.000
            // Logo o número, possivelmente, terá a quantidade de dígitos esperados
            // Para os casos em que o número fique muito pequeno, ele será tratado como erro sendo usado
            // para mostrar ao usuário que aquele valor não corresponde a um número "válido"
            // Obs: desconsidera-se o numero começar com o 9 ou 8, apenas a quantidade de dígitos é validado
            const numberTmp = `${Math.floor(Math.random() * (10 ** digits))}`
            const numberFull = false ? numberTmp : (!verifyNumber(numberTmp, digits)) ? numberTmp : fixNumber(numberTmp, digits)
            console.log({
                numberFull
            })
            // Se o numero tiver 9 dígitos quer dizer que antes do traço ele terá 5 números
            // Se não quer dizer que o número passado, neste teste, será 8, por tanto, terá
            // 4 número antes do traço
            const separator = digits === 9 ? 5 : 4
            return `+55 27 ${numberFull.slice(0, separator)}-${numberFull.slice(separator, numberFull.length)}` 
        }

        const getValue = (index: number) => {
            if(index !== colunaDeContato){
                return `Item[${indexR + 1},${indexC + 1}]`
            } else {
                // Sorteia se o registro será um registro válido ou não
                // Usado para aplicar a classe danger
                const isValid = Math.floor(Math.random() * 10) === 5
                console.log({isValid})
                return getPhoneNumber(isValid)
            }
        }

        Object.defineProperty(_body[indexR], `${_head[indexC]}`, {
            ...descriptorBase,
            value: getValue(indexC)
        })
    }
}
// console.log(_body)

export const DataTable: ITable = {
    head: _head,
    body: _body
}