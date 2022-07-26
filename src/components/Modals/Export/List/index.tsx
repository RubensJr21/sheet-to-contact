import React, { ChangeEvent, DragEvent, useContext, useRef, useState } from "react";
import { ColunaType } from '../types'
import { ColunaContext } from '../index'

import { ITableContext } from '../../../Table/types'
import { TableContext } from "../../../../Contexts/Table";

import './index.css'

const List = () => {
    const { colSelect, setColSelect } = useContext(ColunaContext);
    const {
        dataTable: { head: colunasExt }
    } = useContext(TableContext) as ITableContext;
    
    const [colunas, setColunas] = useState<Array<string>>(colunasExt)

    // console.log(colunas, colunasExt)

    const addCol = (index: any, coluna: string) => {
		// ordenar com base no index
		let _colSelect:Array<ColunaType> = [...colSelect, [index, coluna]]
		_colSelect = _colSelect.sort((a:ColunaType, b:ColunaType) => {
			return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
		})
		setColSelect(_colSelect)
	}
    const rmCol = (index: number) => setColSelect(colSelect.filter((col: ColunaType) => col[0] !== index))
    
    const onChangeCheckBox = (e:ChangeEvent<HTMLInputElement>, index: number, coluna: string) => {
		const chBx: HTMLInputElement = e.target
		if(chBx.checked) addCol(index, coluna)
		else rmCol(index)
	}

    const onDrag = (e:DragEvent<HTMLLIElement>, index:number) => {
        dragItem.current = index
        const li: HTMLLIElement|null = e.target as HTMLLIElement
        li.classList.toggle("isDragging")
    }
    const onDragEnd = (e:DragEvent<HTMLLIElement>, index:number) => {
        onDrag(e, index)
        handleSort()
    }
    const onDragStart = (e:DragEvent<HTMLLIElement>, index:number) => {
        onDrag(e, index)
        dragItem.current = index
    }

    const dragItem = useRef<any>(null)
    const dragOverItem = useRef<any>(null)

    // const handle drag sorting
    const handleSort = () => {
        //duplicate items
        let _colunas = [...colunas]

        // remove and save the dragged item content
        const draggedItemContent = _colunas.splice(dragItem.current, 1)[0]

        // Switch the position
        _colunas.splice(dragOverItem.current, 0, draggedItemContent)

        // reset position ref
        dragItem.current = null
        dragOverItem.current = null

        // update actual array
        setColunas(_colunas)
    }

    return (
        <ul className="list-group max-vh-35 overflow-auto mb-3">
            {colunas.map((coluna: string, index: number) => {
                return (
                    <li key={index} className="list-group-item align-middle cursor-move" draggable
                        onDragStart={(e) => onDragStart(e, index)}
                        onDragEnter={(e) => dragOverItem.current = index}
                        onDragEnd={(e) => onDragEnd(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <input id={`coluna-${index + 1}`} className="form-check-input me-1 cursor-pointer" type="checkbox" onChange={(e) => onChangeCheckBox(e, index, coluna)}/>
                        <label className="form-check-label cursor-pointer" htmlFor={`coluna-${index + 1}`}>
                            {`${index + 1}. ${coluna}`}
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}

export default List;