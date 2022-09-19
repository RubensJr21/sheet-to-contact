import { ITable, ItemBody, ItemHead } from "../../Table/types";

export const verifyDataCsv = (csv: string): {isValid: boolean, lines: Array<Array<string>>} => {
    /*
      Verificar o csv com base no tamanho das linha
      Passo:
        0.  Inicializa variável de validação
        1.  Verificar se existe vírgula nos dados e tratar
        1.1 Caso exista vírgula nos dados ele irá trocar por <comma> antes da mudança de separador
        1.2 Muda separador
        1.3 Volta com as vírgulas dos dados trocando de <comma> para ',' após da mudança de separador
        1.4 Limpa a string CSV
        1.5 Dar split na quebra linha
        2.  Para cada linha gerada dar split no separador usado
        3.  Comparar se todos as listas tem o mesmo tamanho
        4.  Se estiver tudo certo passar para tela de Table
    */
    // 0.
    let isCsvValid = true;

    // 1.
    const stringInCSV  = /(".*?")/g
    // Link de ajuda: Obtendo todos 'matchs' das expressões procuradas (matchAll)
    const termos = Array.from(csv.matchAll(stringInCSV), m => m[0]);

    // 1.1
    if(termos.length > 0){
        const newTermos = termos.map((termo: string) => termo.replaceAll(",", "<comma>"))
    
        termos.forEach((termo: string, index: number) => {
            csv = csv.replace(termo, newTermos[index])
        })
    }
    
    // 1.2
    csv = csv.replaceAll(",", ";")

    // 1.3
    if(termos.length > 0){
        csv = csv.replaceAll("<comma>", ",")
    }

    // 1.4
    csv = csv.replaceAll("\r", "").replaceAll('"',"");

    // 1.5 e 2.
    const lines = csv.split("\n").map((linha: string) => {
        return linha.split(";");
    });

    // 3.
    for (let index = 1; index < lines.length; index++) {
        if (lines[index].length !== lines[index - 1].length) {
            isCsvValid = false;
            break;
        }
    }
    
    // 4.
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