import React from "react";
import { ItemBody } from "../types";

import Actions from "./Actions";
import { numberPhoneColumns } from "../../../configs";
import Td from "./Td";

// Registro
const Tr = (props: {index: number, dados: ItemBody}) => {
    // Se o campo 'número' ou 'celular' forem diferentes do formato: +XX XX XXXXX-XXXX
    // Ou Se o campo de 'cpf' for diferente do formato: XXX.XXX.XXX-XX OU XXXXXXXXXXX
    // Assume-se verifyData retorna false

    const { index: linha, dados } = props

    const pathPhone : RegExp = /\+[0-9]{2} [0-9]{2} [0-9]{4,5}-{0,1}[0-9]{4}/g
    const pathCpf_1 : RegExp = /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g
    const pathCpf_2 : RegExp = /[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}/g

    const colunasOfPhoneNumber = numberPhoneColumns

    const verifyData = (registro : ItemBody) => {
        const keys: Array<string> = Object.keys(registro)
        let fullMatch: Boolean = true
        for(var nameColumn of colunasOfPhoneNumber){
            if(keys.includes(nameColumn)){
                fullMatch = fullMatch && pathPhone.test(registro[nameColumn])
            }
        }
        
        if(keys.includes("cpf")) {
            fullMatch = fullMatch && (pathCpf_1.test(registro["cpf"]) || pathCpf_2.test(registro["cpf"]))
        }
        return fullMatch
    }

    const isDanger = !verifyData(dados)

    return (
        // classe text-danger usada para os registros que tenham dados que precisam de atençãos
        <tr className={`align-middle${ isDanger ? " text-danger" : ""}`}>
            <th scope="row">{linha + 1}</th>
            {
            Object.keys(dados)
                .map((coluna: string) => {
                    return (
                        <Td
                            key={`td-${linha}-${coluna}`}
                            linha={linha} coluna={coluna}
                            valor={dados[coluna]}
                            isDanger={isDanger}
                        />
                    )
            })
            }
            <td><Actions index={linha} /></td>
        </tr>
    );
}

export default Tr;