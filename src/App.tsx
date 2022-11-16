import React, { useContext } from 'react';
import Main from './components/Main';

import Table from './components/Table';
import THead from './components/Table/components/THead';
import TBody from './components/Table/components/TBody';
import Th from './components/Table/components/Th';
import Tr from './components/Table/components/Tr';

import ModalExport from './components/Modals/Export';

import { TableContext } from './Contexts/Table';
import { ITable, ITableContext, ItemBody } from './components/Table/types';
import { ErrorInputProvider } from './components/Main/Contexts/ErrorInput';

function App() {
	const { dataTable } = useContext(TableContext) as ITableContext

	const {head: colunas, body: linhas } = dataTable

	const isDataEmpty = (d: ITable) => {
		return d.head.length === 0 && d.body.length === 0
	}

	if(isDataEmpty(dataTable)){
		return (
			<ErrorInputProvider>
				<Main />
			</ErrorInputProvider>
		);
	} else {
		return (
			<>
			<Table>
				<THead>
				{
					colunas.map((coluna: string, index: any) => {
						return <Th key={`${coluna}-${index}`} text={coluna} />
					})
				}
				</THead>
				<TBody>
				{
					linhas.map((registro: ItemBody, index: number) => {
						return <Tr key={`tr-${index}`} index={index} dados={registro}/>
					})
				}
				</TBody>
			</Table>
			<ModalExport />
			</>
		);
	}
}

export default App;
