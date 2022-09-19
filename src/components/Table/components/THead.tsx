import React from "react";

// Column (Coluna de cabeçalho)
const Th = (props: {text: string}) => {
    return (
        <th scope="col" className="align-middle">
            {props.text}
        </th>
    );
}

const THead = (props: {colunas: Array<string>}) => {
    return (
        <thead className="position-sticky top-0">
            <tr>
                <th scope="col" className="align-middle">#</th>

                {props.colunas.map((coluna: string, index: any) => {
                    return <Th key={`${coluna}-${index}`} text={coluna} />
                })}
                
                <th scope="col" className="align-middle">Ações</th>
            </tr>
        </thead>
    );
}

export default THead;