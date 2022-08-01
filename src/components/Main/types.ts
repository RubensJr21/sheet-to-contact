import { Dispatch, SetStateAction } from "react";
import { IError } from "./Alert/AlertErrorInput/types"

export interface IInputCsvContext {
    inputCsv: string;
    setInputCsv: Dispatch<SetStateAction<string>>
}

export interface IErrorContext {
    error: IError;
    setError: Dispatch<SetStateAction<IError>>;
}