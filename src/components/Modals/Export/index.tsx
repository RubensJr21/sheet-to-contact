import React, { useState, createContext } from "react";
import InputPrefix from "./InputPrefix";
import List from "./List";

import { ColunaType, ColunaContextType } from './types'

export const ColunaContext = createContext({} as ColunaContextType);

const Export = () => {
	const [colSelect, setColSelect] = useState<Array<ColunaType>>([])

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
					<ColunaContext.Provider value={{colSelect, setColSelect}}>
						<h6 className="modal-title mb-2" id="modalExportLabel">
							Escolha ordem e as colunas para gerar o contato:
						</h6>
						<List />
						<InputPrefix />
						* Criar csv de download
					</ColunaContext.Provider>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" className="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div>
    </>
    )
}

export default Export;