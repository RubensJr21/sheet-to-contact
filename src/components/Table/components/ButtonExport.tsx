import React from "react";
import "../index.css"

const ButtonExport = () => {
    // Abre Modals/Export
    return (
        <button 
            type="button"
            className="btn btn-success position-fixed bottom-0 end-0 me-2 mb-2 align-middle"
            data-bs-toggle="modal"
            data-bs-target="#modalExport"
        >
          <i className="bi bi-box-arrow-right size-export"></i>
          <span className='size-export'> Exportar</span>
        </button>
    );
}

export default ButtonExport;