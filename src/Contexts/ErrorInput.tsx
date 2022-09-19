import React, { createContext, ReactNode, useState } from 'react'
import { IError, IErrorContext } from '../components/Main/types';

export const ErrorContext = createContext({} as IErrorContext)

export const ErrorInputProvider = (props: {children: ReactNode}) => {
    const [error, setError] = useState<IError>({} as IError)
    return (
        <ErrorContext.Provider value={{error, setError}}>
            {props.children}
        </ErrorContext.Provider>
    );
}