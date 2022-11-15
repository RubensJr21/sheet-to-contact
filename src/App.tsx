import React, { ReactElement, useContext } from 'react';
import Main from './components/Main';
import Table from './components/Table';
import ModalExport from './components/Modals/Export';
import ModalFormat from './components/Modals/Format';

import { TableContext } from './Contexts/Table';
import { ITable, ITableContext, ItemBody } from './components/Table/types';
import { ErrorInputProvider } from './Contexts/ErrorInput';
import THead from './components/Table/components/THead';
import TBody from './components/Table/components/TBody';
import Tr from './components/Table/components/Tr';

function App() {
	const { dataTable } = useContext(TableContext) as ITableContext

	const { dataTable : {
		head: colunas,
		body: registros
	  } } = useContext(TableContext) as ITableContext

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
		const linhasTabela: Array<ReactElement> = registros.map((registro: ItemBody, index: number) => {
			return <Tr key={index} index={index} dados={registro}/>
		})
		return (
			<>
			<Table>
				<THead colunas={colunas}/>
				<TBody>{linhasTabela}</TBody>
			</Table>
			<ModalExport />
			<ModalFormat />
			</>
		);
	}
}

export default App;
