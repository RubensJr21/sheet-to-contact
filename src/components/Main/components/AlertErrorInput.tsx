import { useContext, useEffect } from "react";
import { ErrorContext } from "../../../Contexts/ErrorInput";
import { IError, IErrorContext } from "../types";

const AlertErrorInput = (props: { error: IError; time: number }) => {
    const { setError } = useContext(ErrorContext) as IErrorContext;

    useEffect(() => {
        const timer = setTimeout(() => {
            setError({} as IError);
        }, props.time);
        return () => clearTimeout(timer);
    }, [props.time, setError]);

    return (
        <div className="p-1 px-3 mt-5 me-2 text-bg-danger rounded-3 z-index-top fit-content position-absolute top-0 end-0">
            <p className="p-1 m-0 text-center">
                Problema ao processar o {props.error.type}
            </p>
            <p className="p-1 m-0 text-center">{props.error.message}</p>
        </div>
    );
};

export default AlertErrorInput;