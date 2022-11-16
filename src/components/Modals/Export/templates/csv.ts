const head = "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Language,Photo,Group Membership,Phone 1 - Type,Phone 1 - Value"

export interface IRow {
    name: string,
    number: string
}

const formatToRow = ({ name, number }: IRow): string => {
    return `${name},${name},,,,,,,,,,,,,,,,,,,,,,,,,,,* myContacts,,${number}`
}

export const getCSV = (registros: Array<IRow>): string => {
    return registros.reduce((prevRow: string, curRow:IRow) => {
        return `${prevRow}\n${formatToRow(curRow)}`
    }, head)
}
