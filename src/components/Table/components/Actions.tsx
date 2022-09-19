import React, { useContext, MouseEvent } from "react";

import { TableContext } from "../../../Contexts/Table";
import { ITableContext, ItemBody } from "../types";
import { FormatContext } from "../../../Contexts/Format";
import { IFormatContext } from "../../Modals/Format/types";

const Actions = (props: { index: number }) => {
    const { setDataFormat } = useContext(FormatContext) as IFormatContext;

    const {
        dataTable: { head: colunas, body: registros },
        setDataTable
    } = useContext(TableContext) as ITableContext

    const getRegistro = (index: number): ItemBody =>  {
        return registros[index] as ItemBody
    }
    
    const onClickRemove = (e:MouseEvent<HTMLButtonElement>, indexOut: number) => {
        setDataTable((oldState) => {
            return ({
                ...oldState,
                body: registros.filter((_: ItemBody, index: number) => index !== indexOut)
            })
        })
    }
    const onClickDuplicate = (e:MouseEvent<HTMLButtonElement>, indexOut: number) => {
        setDataTable((oldState) => {
            return ({
                ...oldState,
                body: [...registros.slice(0, indexOut+1), ...registros.slice(indexOut)]
            })
        })
    }
    const onClickFormat = (e:MouseEvent<HTMLButtonElement>, indexOut: number) => {
        // informar colunas e valores registro clicado
        const registro: ItemBody = {...getRegistro(indexOut)}
        setDataFormat({index: indexOut, colunas, registro })
    }

    return (
        <div className="buttons">
            <button type="button" className="btn btn-outline-danger me-1"
                onClick={(e) => onClickRemove(e, props.index)}
            >
                <i className="bi bi-x-circle-fill"></i> Remover
            </button>
            
            {/*
            <button type="button" className="btn btn-outline-success me-1"
                onClick={(e) => onClick(e, props.index)}
            >
                <i className="bi bi-x-circle-fill"></i> Adicionar
            </button>
            */}
            
            <button type="button" className="btn btn-outline-info me-1"
                onClick={(e) => onClickDuplicate(e, props.index)}
            >
                <i className="bi bi-front"></i> Duplicar
            </button>
            <button type="button" className="btn btn-outline-primary me-1"
                data-bs-toggle="modal"
                data-bs-target="#modalFormat"
                onClick={(e) => onClickFormat(e, props.index)}
            >
                <i className="bi bi-pencil-square"></i> Formatar
            </button>
        </div>
    );
}

export default Actions;