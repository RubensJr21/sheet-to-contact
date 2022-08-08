import React from "react";
import { ItemBody } from "../types";
import Tr from './Registro';

const TBody = (props: {registros: Array<ItemBody>}) => {
    return (
        <tbody>
            {props.registros.map((registro: ItemBody, index: number) => {
              return <Tr key={index} index={index} dados={registro}/>
            })}
        </tbody>
    );
}

export default TBody;