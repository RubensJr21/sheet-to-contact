import React, { createContext, ReactNode, useState } from 'react'
import { DataTable } from '../App/dados';

export const TableContext = createContext({});

export const TableProvider = (props: {children: ReactNode}) => {
    const [dataTable, setDataTable] = useState(DataTable)
    return (
        <TableContext.Provider value={{dataTable, setDataTable}}>
            {props.children}
        </TableContext.Provider>
    );
}