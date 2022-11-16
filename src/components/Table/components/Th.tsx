import React from "react";

const Th = (props: {text: string}) => {
    return (
        <th scope="col" className="align-middle">
            {props.text}
        </th>
    );
}

export default Th;