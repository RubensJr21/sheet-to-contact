import React, { ChangeEvent, DragEvent, useContext, useRef } from "react";
import { ColunaType } from '../types'
import { ColunaContext } from '../index'

import '../index.css'

const List = () => {
    const { colunas, setColunas } = useContext(ColunaContext);

    const addCol = (colunaName: string) => {
		// ordenar com base no index
		let _colunas:Array<ColunaType> = colunas.map((coluna: ColunaType) => {
            return coluna[1] === colunaName ? [coluna[0], coluna[1], true] : coluna
        })
		// _colunas = _colunas.sort((a:ColunaType, b:ColunaType) => {
		// 	return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
		// })
		setColunas(_colunas)
	}
    const rmCol = (colunaName: string) => setColunas(colunas.map((coluna: ColunaType) => {
        return coluna[1] === colunaName ? [coluna[0], coluna[1], false] : coluna
    }))
    
    const onChangeCheckBox = (e:ChangeEvent<HTMLInputElement>, index: number, colunaName: string) => {
		const chBx: HTMLInputElement = e.target
		if(chBx.checked) addCol(colunaName)
		else rmCol(colunaName)
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
            {colunas.map((coluna: ColunaType, index: number) => {
                return (
                    <li key={index} className="list-group-item align-middle cursor-move" draggable
                        onDragStart={(e) => onDragStart(e, index)}
                        onDragEnter={(e) => dragOverItem.current = index}
                        onDragEnd={(e) => onDragEnd(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <input id={`coluna-${index + 1}`} className="form-check-input me-1 cursor-pointer" type="checkbox"
                            checked={coluna[2]}
                            // onClick={}
                            onChange={(e) => onChangeCheckBox(e, index, coluna[1])}/>
                        <label className="form-check-label cursor-pointer" htmlFor={`coluna-${index + 1}`}>
                            {`${index + 1}. ${coluna[1]}`}
                        </label>
                    </li>
                )
            })}
        </ul>
    )
}

export default List;