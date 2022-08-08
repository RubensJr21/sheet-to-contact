import React from "react";
import { ItemBody } from "../../Table/types";
import Actions from "../Actions";
import { numberPhoneColumns } from "../../../App/configs";

const Registro = (props: {index: number, dados: ItemBody}) => {
    // Se o campo 'número' ou 'celular' forem diferentes do formato: +XX XX XXXXX-XXXX
    // Ou Se o campo de 'cpf' for diferente do formato: XXX.XXX.XXX-XX OU XXXXXXXXXXX
    // Assume-se verifyData retorna false
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
    return (
        // classe text-danger usada para os registros que tenham dados que precisam de atenção
        <tr className={`align-middle${!verifyData(props.dados) ? " text-danger" : ""}`}>
            <th scope="row">{props.index + 1}</th>
            {   
                Object.keys(props.dados)
                    .map((key: string) => {
                        return <td key={`${props.index}-${key}`}>{props.dados[key]}</td>
                })
            }
            <td><Actions index={props.index} /></td>
        </tr>
    );
}

export default Registro;

