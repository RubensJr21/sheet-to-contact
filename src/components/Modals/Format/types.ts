import React, { Dispatch, SetStateAction, MouseEvent } from "react";

export interface IRegistro {
    [key: string]: string
}

export interface IFormat {
    index: number,
    colunas: Array<string>,
    registro: IRegistro,
}

export interface IFormatContext {
	dataFormat: IFormat,
	setDataFormat: Dispatch<SetStateAction<IFormat>>,
}