import React, { useContext, ChangeEvent, MouseEvent } from "react";
import { numberPhoneColumns } from "../../../configs";
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

    const formatNumber = (keyOut: string, number: string) => {
        var value = number;
        number = number.replaceAll(/[^0-9]/g, "");
        var reg: RegExp
        var match: Array<string> = []
        // var match: RegExpMatchArray | null
        switch (number.length) {
            /*
            98765432      -  8
            987654321     -  9
            27987654321    - 10
            279987654321   - 11
            5527987654321  - 12
            55279987654321 - 13
            */
            case 8:
                reg = /^([0-9]{4})([0-9]{4})$/g
                match = reg.exec(number) ?? [];
                match = match.slice(1, match.length).reverse()
                value = `+55 27 ${match[1]}-${match[0]}`
                break;
            case 9:
                reg = /^([0-9]{5})([0-9]{4})$/g
                match = reg.exec(number) ?? [];
                match = match.slice(1, match.length).reverse()
                value = `+55 27 ${match[1]}-${match[0]}`
                break;
            case 10:
                reg = /^([0-9]{2})([0-9]{4})([0-9]{4})$/g
                match = reg.exec(number) ?? [];
                match = match.slice(1, match.length).reverse()
                value = `+55 ${match[2]} ${match[1]}-${match[0]}`
                break;
            case 11:
                reg = /^([0-9]{2})([0-9]{5})([0-9]{4})$/g
                match = reg.exec(number) ?? [];
                match = match.slice(1, match.length).reverse()
                value = `+55 ${match[2]} ${match[1]}-${match[0]}`
                break;
            case 12:
                reg = /^(55)([0-9]{2})([0-9]{4})([0-9]{4})$/g
                match = reg.exec(number) ?? [];
                match = match.slice(1, match.length).reverse()
                value = `+${match[3]} ${match[2]} ${match[1]}-${match[0]}`
                break;
            case 13:
                reg = /^(55)([0-9]{2})([0-9]{5})([0-9]{4})$/g
                match = reg.exec(number) ?? [];
                match = match.slice(1, match.length).reverse()
                value = `+${match[3]} ${match[2]} ${match[1]}-${match[0]}`
                break;
            default:
                break;
        }
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
            // console.log({key, registro: dataFormat.registro[key], contains_key: numberPhoneColumns.includes(key)});
            const columnName: string = dataFormat.colunas[index];
            const number: string = dataFormat.registro[key];
            return (
                // Tentar colocar botão que formata automaticamente os campos
                // Cujo as estruturas já sejam conhecidas. Ex.: Celular e CPF
                <div key={index} className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">{columnName}</span>
                    <input type="text" className="form-control"
                        value={number}
                        onChange={(e) => onChangeValue(e, key)}
                        aria-label={number} aria-describedby="basic-addon1" />
                    {numberPhoneColumns.includes(key) ? 
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => formatNumber(key, number)}>Format</button>
                    : null}
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