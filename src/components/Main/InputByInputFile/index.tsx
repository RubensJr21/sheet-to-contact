import React, { ChangeEvent, useContext } from "react";
import { TableContext } from "../../../Contexts/Table";
import { ITable, ITableContext } from "../../Table/types";
import { getHeadAndBody, populateTable, verifyDataCsv } from "../FunctionsOfInput";

const InputByInputFile = () => {
    const { setDataTable } = useContext(TableContext) as ITableContext

    const loadCsv = (lines: Array<Array<string>>) => {
        const { head, body } = getHeadAndBody(lines)
        const table: ITable = populateTable(head, body)
        setDataTable(table)
    }

    const onChange = async (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)
        if(file){
            const text = await file.text()
            console.log(text)
            const { isValid, lines } = verifyDataCsv(text)
            if(isValid){
                console.log("CSV VALIDO")
                loadCsv(lines)
            }
        }
    }

    return (
    <>
        <div className="mt-3 mb-3 d-flex flex-column align-items-center">
            <label htmlFor="fileCSV" className="form-label text-bg-dark">Selecione o arquivo com os contatos:</label>
            <input className="form-control w-auto" type="file" accept=".csv" id="fileCSV" onChange={onChange}/>
        </div>
    </>
    )
}

export default InputByInputFile;