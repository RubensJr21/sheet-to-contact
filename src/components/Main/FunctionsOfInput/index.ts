import { ITable, ItemBody, ItemHead } from "../../Table/types";

export const verifyDataCsv = (csv: string): {isValid: boolean, lines: Array<Array<string>>} => {
    /*
      Verificar o csv com base no tamanho das linha
      Passo:
        1. Dar split na quebra linha
        2. Para cada linha gerada dar split no separador usado
        3. Comparar se todos as listas tem o mesmo tamanho
        4. Se estiver tudo certo passar para tela de Table
    */
    // -1. Garante que o separador do arquivo será uma vírgula
    csv = csv.replaceAll(";", ",");
    //  0. Inicializa variável de validação
    let isCsvValid = true;

    // 1. e 2.
    const lines = csv.split("\n").map((linha: string) => {
        return linha.split(",");
    });

    // 3.
    for (let index = 1; index < lines.length; index++) {
        if (lines[index].length !== lines[index - 1].length) {
            isCsvValid = false;
            break;
        }
    }

    console.log(lines);
    return {isValid: isCsvValid, lines: isCsvValid ? lines : []};
}

export const populateTable = (head: Array<string>, body: Array<Array<string>>): ITable => {
    const _head: Array<ItemHead> = head
    const _body: Array<ItemBody> = []
    
    const qtdDeRegistros = body.length
    const qtdDeColunas = head.length

    const descriptorBase = {
        configurable: true,
        enumerable: true,
        writable: true,
    }

    for (let indexR = 0; indexR < qtdDeRegistros; indexR++){
        _body.push({} as ItemBody)
        for (let indexC = 0; indexC < qtdDeColunas; indexC++) {
            Object.defineProperty(_body[indexR], `${_head[indexC]}`, {
                ...descriptorBase,
                value: body[indexR][indexC]
            })
        }
    }

    const table: ITable = {
        head: head, body: _body
    }
    return table;
}

export const getHeadAndBody = (lines: Array<Array<string>>): { head: Array<string>, body: Array<Array<string>> } => {
    return {
        head: lines[0],
        body: lines.slice(1)
    }
}