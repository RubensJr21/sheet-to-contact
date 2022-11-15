import React, { ReactElement } from "react";

const TBody = (props: {children: Array<ReactElement>}) => {
    return (
        <tbody>
            {props.children}
        </tbody>
    );
}

export default TBody;