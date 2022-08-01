import React, { useState, createContext, useContext } from "react";


const Input = () => {
	return (
    <>
	<div className="modal fade modal-lg" id="modalInput" tabIndex={-1} aria-labelledby="modalInputLabel" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="modalInputLabel">Erro no arquivo:</h5>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
					...
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" className="btn btn-primary" onClick={() => console.log("Gerar contatos")} >Gerar contatos</button>
				</div>
			</div>
		</div>
	</div>
    </>
    )
}

export default Input;