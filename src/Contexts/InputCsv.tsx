import React, { createContext, ReactNode, useState } from 'react'
import { IInputCsvContext } from '../components/Main/types';

export const InputCsvContext = createContext({} as IInputCsvContext)

export const InputCsvProvider = (props: {children: ReactNode}) => {
    const [inputCsv, setInputCsv] = useState<string>("")
    return (
        <InputCsvContext.Provider value={{inputCsv, setInputCsv}}>
            {props.children}
        </InputCsvContext.Provider>
    );
}