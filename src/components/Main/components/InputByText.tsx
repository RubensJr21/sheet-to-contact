import { ChangeEvent, useContext, MouseEvent } from "react";
import { ErrorContext } from "../Contexts/ErrorInput";
import { InputCsvContext } from "../Contexts/InputCsv";
import { TableContext } from "../../../Contexts/Table";
import { ITable, ITableContext } from "../../Table/types";
import { getHeadAndBody, populateTable, verifyDataCsv } from "../functions/OfInput";
import { IErrorContext } from "../types";

const InputByText = () => {
    const { changeTable } = useContext(TableContext) as ITableContext;
    const { inputCsv, setInputCsv } = useContext(InputCsvContext);
    const { setError } = useContext(ErrorContext) as IErrorContext;

    const loadCsv = (lines: Array<Array<string>>) => {
        const { head, body } = getHeadAndBody(lines);
        const table: ITable = populateTable(head, body);
        changeTable(table);
    };

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputCsv(e.target.value);
    };

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { isValid, lines } = verifyDataCsv(inputCsv);
        if (isValid) {
            loadCsv(lines);
        } else {
            setError({
                type: "texto",
                message: "O texto não tem um formato 'csv' válido",
            });
        }
    };

    return (
        <>
            <div className="w-75 h-100 mt-2 mb-4 shadow position-relative">
                <textarea
                    className="form-control w-100 h-100 shadow"
                    style={{ resize: "none" }}
                    placeholder="Cole o csv aqui.."
                    id="insertionCSV"
                    value={inputCsv}
                    onChange={onTextAreaChange}
                />
                <button
                    type="button"
                    onClick={onClick}
                    className="btn btn-success position-absolute bottom-0 end-0 me-1 mb-1"
                >
                    Carregar
                </button>
            </div>
        </>
    );
};

export default InputByText;