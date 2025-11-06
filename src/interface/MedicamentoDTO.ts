export interface MedicamentoDTO {
    idMedicamento? : number,
    nome: string,
    fabricante: string,
    principioAtivo: string,
    dataValidade: Date,
    preco : number,
    situacao?: boolean
}
