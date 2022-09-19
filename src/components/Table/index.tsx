import React, { useContext } from 'react';
import THead from './components/THead'
import TBody from './components/TBody'
import ButtonExport from './components/ButtonExport';

import { TableContext } from '../../Contexts/Table';
import { ITableContext } from './types';

const Table = () => {
  const { dataTable : {
    head: colunas,
    body: registros
  } } = useContext(TableContext) as ITableContext
    return(
      <div className='position-relative vw-100 vh-100 mw-100'>
        <table className="table table-dark table-hover table-bordered">
          <THead colunas={colunas}/>
          <TBody registros={registros} />
        </table>
        <ButtonExport />
      </div>
    );
}

export default Table;