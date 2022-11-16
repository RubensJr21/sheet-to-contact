import React, { ChangeEvent, useContext, useRef } from "react";
import { TableContext } from "../../../Contexts/Table";
import { ITableContext, ItemBody} from "../types";

const Td = (props: {linha: number, coluna: string, valor: string, isDanger: boolean}) => {
    const {linha, coluna, valor, isDanger} = props
    
    const inputRef = useRef<HTMLInputElement>(null);

    const { dataTable, changeTable } = useContext(TableContext) as ITableContext;
    
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        
        const newValue = removerTags(trimSpaces(e.target.value))

        const { body } = dataTable

        const newBody = body.map((registro: ItemBody, index) => {
            if(linha === index){
                const r = { ...registro }
                r[coluna] = newValue
                return r
            } else {
                return registro
            }
        })

        changeTable({
            ...dataTable,
            body: newBody
        });
    }

    const trimSpaces = (string: string) => {
        return string
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
    }

    const removerTags = (html: string) => {
        const data = new DOMParser().parseFromString(html, 'text/html');
        return data.body.textContent || "";
    }

    return (
        <td onClick={() => inputRef?.current?.focus()}>
            <input
                ref={inputRef}
                type="text"
                className={`w-100${isDanger ? " text-danger" : " text-white"}`}
                value={valor}
                onChange={(e) => {
                    changeValue(e)
                }}/>
        </td>
    );
}

export default Td;