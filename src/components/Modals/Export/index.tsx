import React, { useState, createContext, useContext } from "react";
import { TableContext } from "../../../Contexts/Table";
import { ITableContext, ItemBody } from "../../Table/types";
import InputPrefix from "./components/InputPrefix";
import List from "./components/List";
import { getCSV, IRow } from "./templates/csv";

import { ColunaType, ColunaContextType, PrefixContextType } from './types'
import { numberPhoneColumns } from "../../../configs";

export const ColunaContext = createContext({} as ColunaContextType);
export const PrefixContext = createContext({} as PrefixContextType);

const Export = () => {
	const { dataTable: { head: colunasExt, body: registros } } = useContext(TableContext) as ITableContext;
    
    const colunasToIgnore = numberPhoneColumns

	const filtredColuns = colunasExt.filter((coluna: string) => {
        return !colunasToIgnore.includes(coluna);
    })

    const [colunas, setColunas] = useState<Array<ColunaType>>(filtredColuns.map((colunaName:string, index: number) => {
		return [index, colunaName, false]
	}))

	const [prefix, setPrefix] = useState<string>("")

	const downloadCSVFile = (csv_data: string) => {

		// Cria objeto de arquivo CSV e feed
		// nosso csv_data nele
		const CSVFile = new Blob(["\ufeff", csv_data], {
			type: "text/csv"
		});
	   
		// Cria um link temporário para iniciar
		// processo de download
		var temp_link = document.createElement('a');
	   
		//Baixa o arquivo csv
		temp_link.download = "contacts.csv";
		var url = window.URL.createObjectURL(CSVFile);
		temp_link.href = url;
	   
		// Este link não deve ser exibido
		temp_link.style.display = "none";
		document.body.appendChild(temp_link);
	   
		//Clique automaticamente no link para
		// aciona o download
		temp_link.click();
		document.body.removeChild(temp_link);
	}

	const gerarContatos = () => {
		const filtredColunas = colunas.filter((coluna: ColunaType) => coluna[2] === true)
		const columnsToContact = filtredColunas.map(( item:ColunaType ) => {
			return item[1]
		})
		const getContactColumn = (registro: ItemBody) => {
			const keysFromRegistry = Object.keys(registro)
			for (let index = 0; index < keysFromRegistry.length; index++) {
				const coluna: string = keysFromRegistry[index];
				if(colunasToIgnore.includes(coluna)){
					return coluna;
				}
			}
			return ""
		}
		const r = registros.map((registro: ItemBody): IRow => {
			const registryToContact = columnsToContact.map((coluna:string) => {
				return registro[coluna]
			})
			const contactColumn = getContactColumn(registro)
			const name = `${prefix !== "" ? prefix + "_" : ""}${registryToContact.join("_")}`
			const number = contactColumn !== "" ? registro[contactColumn] : "";
			const row: IRow = {name , number};
			return row;
		})
		const csv = getCSV(r)
		downloadCSVFile(csv);
	}

	return (
    <>
	<div className="modal fade modal-lg" id="modalExport" tabIndex={-1} aria-labelledby="modalExportLabel" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="modalExportLabel">Exportar contatos:</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					<ColunaContext.Provider value={{colunas, setColunas}}>
						<h6 className="modal-title mb-2" id="modalExportLabel">
							Escolha ordem e as colunas para gerar o contato:
						</h6>
						<List />
						<PrefixContext.Provider value={{prefix, setPrefix}}>
							<InputPrefix />
						</PrefixContext.Provider>
					</ColunaContext.Provider>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" className="btn btn-primary" onClick={gerarContatos} >Gerar contatos</button>
				</div>
			</div>
		</div>
	</div>
    </>
    )
}

export default Export;