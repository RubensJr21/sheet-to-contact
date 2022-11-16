import React, { useContext } from "react";
import { ErrorContext } from "./Contexts/ErrorInput";
import { InputCsvProvider } from "./Contexts/InputCsv";

import "./index.css";
import AlertErrorInput from "./components/AlertErrorInput";
import AlertOfColumn from "./components//AlertOfColumn";
import InputByInputFile from "./components//InputByInputFile";
import InputByText from "./components//InputByText";

const Main = () => {
    const { error } = useContext(ErrorContext);

    return (
        <>
            <div className="bg-dark w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
                <AlertOfColumn />
                <InputCsvProvider>
                    {error?.message ? (
                        <AlertErrorInput error={error} time={5000} />
                    ) : null}
                    <InputByInputFile />
                    <p className="h1 text-bg-dark">OU</p>
                    <InputByText />
                </InputCsvProvider>
            </div>
        </>
    );
};

export default Main;
