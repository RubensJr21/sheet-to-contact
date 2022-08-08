const colunas: Array<string> = ["Nome", "Número", "Cpf"];

const dados: Array<object> = [
    {
        name: "Mark",
        number: "+55 XX XXXXX-XXXX",
        cpf: "XXX.XXX.XXX-XX"
    },
    {
        name: "Jacob",
        number: "+55 XX XXXXX-XXXX",
        cpf: "XXX.XXX.XXX-XX"
    },
    {
        name: "Larry",
        number: "+55 XX XXXXX-XXXX",
        cpf: "XXX.XXX.XXX-XX"
    },
    {
        name: "Mike",
        number: "+55 XX XXXXX-XXXX",
        cpf: "111.111.111-00"
    },
    {
        // atributo número cai na verificação
        name: "Dustin",
        "número": "+55 XX XXXXX-XXXX",
        cpf: "XXX.XXX.XXX-XX"
    },
    {
        // atributo numero cai na verificação
        name: "Lucas",
        numero: "+55 27 99999-9999",
        cpf: "XXX.XXX.XXX-XX"
    },
    {
        // atributo celular cai na verificação
        name: "Max",
        celular: "+55 27 9999-9999",
        cpf: "XXX.XXX.XXX-XX"
    },
]

export const T_HEAD = {
    colunas
}

export const T_BODY = {
    dados
}

const Dados = {
    T_HEAD,
    T_BODY
}

export default Dados;