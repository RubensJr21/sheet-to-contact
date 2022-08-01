import React, { createContext, useState } from "react";

import ModalErrorInput from "../Modals/Errors/Input";
import { IError } from "../Modals/Errors/Input/types"
import Alert from "./Alert";
import InputByInputFile from "./InputByInputFile";
import InputByText from "./InputByTextArea"

import { IErrorContext, IInputCsvContext } from "./types";

export const InputCsvContext = createContext({} as IInputCsvContext)
export const ErrorContext = createContext({} as IErrorContext)

const Main = () => {
  const [error, setError] = useState<IError>({} as IError)
  const [inputCsv, setInputCsv] = useState<string>("")

  return (
  <>
    <div className="bg-dark w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <Alert />
      <ErrorContext.Provider value={{error, setError}}>
        <InputCsvContext.Provider value={{inputCsv, setInputCsv}}>
          <InputByInputFile />
          <p className="h1 text-bg-dark">OU</p>
          <InputByText />
        </InputCsvContext.Provider>
        {/* Usar if condicional para mostrar o Modal */}
        {Object.keys(error).length > 0 ?? <ModalErrorInput />}
      </ErrorContext.Provider>
    </div>
  </>
  )
}

export default Main;