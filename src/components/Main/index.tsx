import React, { useContext } from "react";
import { ErrorContext } from "../../Contexts/ErrorInput";
import { InputCsvProvider } from "../../Contexts/InputCsv";


import AlertOfColumn from "./Alert/AlertOfColumn";
import AlertErrorInput from "./Alert/AlertErrorInput";
import InputByInputFile from "./InputByInputFile";
import InputByText from "./InputByTextArea"

const Main = () => {
  const { error } = useContext(ErrorContext)

  return (
  <>
    <div className="bg-dark w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <AlertOfColumn />
      <InputCsvProvider>
        {error?.message ? <AlertErrorInput error={error} time={5000} /> : null}
        {/* <AlertErrorInput error={error} time={5000} /> */}
        <InputByInputFile />
        <p className="h1 text-bg-dark">OU</p>
        <InputByText />
      </InputCsvProvider>
    </div>
  </>
  )
}

export default Main;