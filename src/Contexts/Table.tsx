import React, { createContext, ReactNode, useState } from 'react'
import { ITable } from '../components/Table/types'

export const TableContext = createContext({});

const DataTable: ITable = {
    head: [],
    body: []
}

export const TableProvider = (props: {children: ReactNode}) => {
    const [dataTable, setDataTable] = useState(DataTable)

    const changeTable = (newState: ITable) => {
        setDataTable(newState)
    }

    return (
        <TableContext.Provider value={{dataTable, changeTable}}>
            {props.children}
        </TableContext.Provider>
    );
}