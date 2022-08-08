import React, { ChangeEvent, useCallback, useContext } from "react";
import { ErrorContext } from "../../../Contexts/ErrorInput";
import { TableContext } from "../../../Contexts/Table";
import { ITable, ITableContext } from "../../Table/types";
import { getHeadAndBody, populateTable, verifyDataCsv } from "../FunctionsOfInput";
import { IErrorContext } from "../types";

import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js'

const InputByInputFile = () => {
    const { setDataTable } = useContext(TableContext) as ITableContext
    const { setError } = useContext(ErrorContext) as IErrorContext

    const loadCsv = useCallback((lines: Array<Array<string>>) => {
        const { head, body } = getHeadAndBody(lines)
        const table: ITable = populateTable(head, body)
        setDataTable(table)
    }, [setDataTable])

    const onChange = useCallback(async (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)
        const regEx_FileCsv = /\.csv$/
        if(file){
            if(regEx_FileCsv.test(file.name)){
                const text = await file.text()
                const { isValid, lines } = verifyDataCsv(text)
                if(isValid){
                    loadCsv(lines)
                }else{
                    setError({
                        type: "arquivo",
                        message: "O arquivo não tem um formato 'csv' válido"
                    })
                }
            }else{
                setError({
                    type: "arquivo",
                    message: "O arquivo selecionado não é um arquivo 'csv'"
                })
            }
        }
    }, [setError, loadCsv])

    return (
    <>
        <div className="mt-3 mb-3 d-flex flex-column align-items-center">
            <label htmlFor="fileCSV" className="form-label text-bg-dark">Selecione o arquivo com os contatos:</label>
            <input className="form-control w-auto" type="file" accept=".csv" id="fileCSV"
                onChange={onChange}/>
        </div>
    </>
    )
}

export default InputByInputFile;