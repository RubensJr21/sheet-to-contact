const AlertOfColumn = () => {
    return (
        <div className="p-1 mt-2 px-3 text-bg-warning rounded-3">
            <p className="p-1 m-0 text-center">
                É indicado que a sua tabela possua o campo de número de contato
                com um dos seguintes valores:
            </p>
            <p className="p-1 m-0 text-center">
                <strong>
                    Número, Numero, número, numero, Celular, Cel, celular, cel,
                    Telefone, telefone, Tel, tel
                </strong>
            </p>
            <p className="p-1 m-0 text-center">
                Isso serve para que o sistema possa auxiliar indicando quais
                números estão no formato esperado
            </p>
        </div>
    );
};

export default AlertOfColumn;