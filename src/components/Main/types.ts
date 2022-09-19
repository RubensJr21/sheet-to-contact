import { Dispatch, SetStateAction } from "react";

export interface IError {
    type: string,
    message: string,
}

export interface IInputCsvContext {
    inputCsv: string;
    setInputCsv: Dispatch<SetStateAction<string>>
}

export interface IErrorContext {
    error: IError;
    setError: Dispatch<SetStateAction<IError>>;
}