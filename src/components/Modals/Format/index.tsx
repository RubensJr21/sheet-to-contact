import React, { useContext, ChangeEvent, MouseEvent } from "react";
import { FormatContext } from "../../../Contexts/Format";
import { TableContext } from "../../../Contexts/Table";
import { ITableContext } from "../../Table/types";
import { IFormatContext  } from "./types";

const Format = () => {
    const { dataFormat, setDataFormat } = useContext(FormatContext) as IFormatContext;

    const { dataTable, setDataTable } = useContext(TableContext) as ITableContext

    const onSaveFormat = (e:MouseEvent<HTMLButtonElement>): void => {
        const {index, registro} = dataFormat
        const { body } = dataTable

        body[index] = registro

        const dataSave = {
            ...dataTable,
            body
        }
        
        setDataTable(dataSave)
    }

    const onChangeValue = (e:ChangeEvent<HTMLInputElement>, keyOut: string) => {
        const input: HTMLInputElement = e.target
        const value = input.value
        setDataFormat((oldState) => {
            var newState = { ...oldState }
            if(Object.keys(newState.registro).includes(keyOut)){
                newState["registro"][keyOut] = value
            }
            return newState
        })
    }

	const renderInputs = () => {
        return Object.keys(dataFormat.registro).map((key: string, index: number) => {
            return (
                // Tentar colocar botão que formata automaticamente os campos
                // Cujo as estruturas já sejam conhecidas. Ex.: Celular e CPF
                <div key={index} className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">{dataFormat.colunas[index]}</span>
                    <input type="text" className="form-control"
                        value={dataFormat.registro[key]}
                        onChange={(e) => onChangeValue(e, key)}
                        aria-label={dataFormat.registro[key]} aria-describedby="basic-addon1" />
                </div>
            )
        })
    }
    
    return (
    <>
	<div className="modal fade modal-lg" id="modalFormat" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="modalFormatLabel" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="modalFormatLabel">Exportar contatos:</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					{renderInputs()}
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" className="btn btn-primary" onClick={onSaveFormat}>Save changes</button>
				</div>
			</div>
		</div>
	</div>
    </>
    )
}

export default Format;