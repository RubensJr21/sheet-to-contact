import React, { createContext, ReactNode, useState } from 'react'
import { IFormat } from '../components/Modals/Format/types';

export const FormatContext = createContext({});

export const FormatProvider = (props: {children: ReactNode}) => {
    const [dataFormat, setDataFormat] = useState({index: 0, colunas: [], registro: {}, onSaveFormat: () => {}} as IFormat)
    return (
        <FormatContext.Provider value={{dataFormat, setDataFormat}}>
            {props.children}
        </FormatContext.Provider>
    );
}