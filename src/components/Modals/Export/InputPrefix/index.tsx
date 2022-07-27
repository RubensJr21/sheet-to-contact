import React, { useContext } from "react";
import { ColunaType } from '../types'
import { ColunaContext } from '../index'

const InputPrefix = () => {
    const { colunas } = useContext(ColunaContext);
    
    const formatoContato = (): string => {
        const colunasFiltred = colunas.filter((item: ColunaType) => item[2] === true)
        const colunasName = colunasFiltred.map((item: ColunaType) => item[1])
        // console.log(colunasName)
        return colunasName.length > 0 ? colunasName.join("_") : ""
	}

    // console.log({colunas})

    return(
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Prefixo" aria-label="Prefixo" />
            <span className="input-group-text">_</span>
            <input type="text" className="form-control w-75" value={formatoContato()} aria-label={formatoContato()} disabled readOnly/>
        </div>
    )
}

export default InputPrefix;