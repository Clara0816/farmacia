export interface ClienteDTO {
    idCliente? : number,
    cpf: number,
    nome: string,
    nascimento: string,
    telefone: string,
    email: string,
    situacao?: boolean
}