import React, { useContext } from "react";
import { ColunaType } from '../types'
import { ColunaContext } from '../index'

const InputPrefix = () => {
    const { colSelect } = useContext(ColunaContext);
    
    const formatoContato = (): string => {
		return colSelect.map((item: ColunaType) => item[1]).join("_")
	}

    return(
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Prefixo" aria-label="Prefixo" />
            <span className="input-group-text">_</span>
            <input type="text" className="form-control w-75" value={formatoContato()} aria-label={formatoContato()} disabled readOnly/>
        </div>
    )
}

export default InputPrefix;