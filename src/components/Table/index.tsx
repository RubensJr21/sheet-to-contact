import React, { ReactElement } from 'react';
import ButtonExport from './components/ButtonExport';

const Table = (props: { children: Array<ReactElement> }) => {
    return(
      <div className='position-relative vw-100 vh-100 mw-100'>
        <table className="table table-dark table-hover table-bordered">
          {props.children}
        </table>
        <ButtonExport />
      </div>
    );
}

export default Table;