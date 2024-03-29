import React, { useContext } from 'react';
import Main from './components/Main';
import Table from './components/Table';
import ModalExport from './components/Modals/Export';
import ModalFormat from './components/Modals/Format';

import { TableContext } from './Contexts/Table';
import { ITable, ITableContext } from './components/Table/types';
import { ErrorInputProvider } from './Contexts/ErrorInput';

function App() {
	const { dataTable } = useContext(TableContext) as ITableContext

	const isDataEmpty = (d: ITable) => {
		return d.head.length === 0 && d.body.length === 0
	}

	if(isDataEmpty(dataTable)){
		return (
			<ErrorInputProvider>
				<Main />
			</ErrorInputProvider>
		);
	}else{
		return (
			<>
			<Table />
			<ModalExport />
			<ModalFormat />
			</>
		);
	}
}

export default App;
