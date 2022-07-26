import React from "react";

const Column = (props: {text: string}) => {
    return (
        <th scope="col" className="align-middle">
            {props.text}
        </th>
    );
}

export default Column;