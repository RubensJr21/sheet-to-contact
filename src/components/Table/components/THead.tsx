import React, { ReactElement } from "react";

const THead = (props: {children: Array<ReactElement>}) => {
    return (
        <thead className="position-sticky top-0">
            <tr>
                <th scope="col" className="align-middle">#</th>
                {props.children}
                <th scope="col" className="align-middle">Ações</th>
            </tr>
        </thead>
    );
}

export default THead;