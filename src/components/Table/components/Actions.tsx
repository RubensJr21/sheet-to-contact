import React, { useContext, MouseEvent } from "react";

import { TableContext } from "../../../Contexts/Table";
import { ITableContext, ItemBody } from "../types";

const Actions = (props: { index: number }) => {

    const {index: linha} = props

    const { dataTable, changeTable } = useContext(TableContext) as ITableContext

    const {head: colunas, body: registros} = dataTable
    
    const onClickRemove = (e:MouseEvent<HTMLButtonElement>, indexOut: number) => {
        const body = registros.filter((_: ItemBody, index: number) => index !== indexOut)
        changeTable({
            head: colunas,
            body
        })
    }
    const onClickDuplicate = (e:MouseEvent<HTMLButtonElement>, indexOut: number) => {
        const body = [...registros.slice(0, indexOut + 1), ...registros.slice(indexOut)]
        changeTable({
            head: colunas,
            body
        })
    }    

    return (
        <div className="buttons d-flex">
            <button type="button" className="btn btn-outline-danger me-1 inline"
                onClick={(e) => onClickRemove(e, linha)}
            >
                <i className="bi bi-x-circle-fill"></i> Remover
            </button>
            
            <button type="button" className="btn btn-outline-info me-1 inline"
                onClick={(e) => onClickDuplicate(e, linha)}
            >
                <i className="bi bi-front"></i> Duplicar
            </button>
        </div>
    );
}

export default Actions;