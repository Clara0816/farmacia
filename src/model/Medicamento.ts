import { DatabaseModel } from "./DatabaseModel.js"; 
import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
const database = new DatabaseModel().pool; 


class Medicamento {

    private idMedicamento: number = 0;
    private nome: string;
    private fabricante: string;
    private principioAtivo: string;
    private dataValidade: Date;
    private preco: number;
  
    constructor(
        _nome: string,
        _fabricante: string,
        _principioAtivo: string,
        _dataValidade: Date,
        _preco: number
    ) {
        this.nome = _nome;
        this.fabricante = _fabricante;
        this.principioAtivo = _principioAtivo;
        this.dataValidade = _dataValidade;
        this.preco = _preco;
    }

  
    public getIdMedicamento(): number {
        return this.idMedicamento;
    }

    
    public setIdMedicamento(idMedicamento: number): void {
        this.idMedicamento = idMedicamento;
    }

    public getNome(): string {
        return this.nome;
    }

    
    public setNome(nome: string): void {
        this.nome = nome;
    }


    public getfabricante(): string {
        return this.fabricante;
    }

   
    public setFabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }

    public getPrincipioAtivo(): string {
        return this.principioAtivo;
    }

    public setPrincipioAtivo(principioAtivo: string): void {
        this.principioAtivo = principioAtivo;
    }

     public getDataValidade(): Date {
        return this.dataValidade;
    }

   
    public setDataValidade(dataValidade: Date): void {
        this.dataValidade = dataValidade;
    }

    
     static async listarMedicamentos(): Promise<Array<Medicamento> | null> {
        try {          
            let listaDeMedicamentos: Array<Medicamento> = [];
            const querySelectMedicamentos = `SELECT * FROM medicamentos;`;

            const respostaBD = await database.query(querySelectMedicamentos);

            respostaBD.rows.forEach((medicamentoBD) => {
               
                const novoMedicamento: Medicamento = new Medicamento(
                    medicamentoBD.nome,
                    medicamentoBD.fabricante,
                    medicamentoBD.principioAtivo,
                    medicamentoBD.dataValidade,
                    medicamentoBD.preco
                );
               
                novoMedicamento.setIdMedicamento(medicamentoBD.id_medicamento);

                listaDeMedicamentos.push(novoMedicamento);
            });
            
            return listaDeMedicamentos;

        } catch (error) {
           
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

     /**
         * Insere um cliente no banco de dados
         * 
         * @param carro objeto a ser inserido no banco
         * @returns **true** caso a inserção tenha sido feita, **false** em caso de erro
         */
        static async cadastrarMedicamento(medicamento: MedicamentoDTO): Promise<boolean> {
            try {
                // Define a query SQL para inserir um novo cliente na tabela 'cliente'
                // Os valores serão passados como parâmetros ($1, $2, $3)
                // O comando RETURNING retorna o id_cliente gerado automaticamente pelo banco
                const queryInsertMedicamento = `INSERT INTO medicamentos (nome, fabricante, principio ativo, data validade, preço)
                                    VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_medicamento;`;
    
                // Executa a query no banco de dados, passando os dados do cliente como parâmetros
                // Usa toUpperCase() para padronizar o nome em letras maiúsculas
                const respostaBD = await database.query(queryInsertMedicamento, [
                    medicamento.nome.toUpperCase(), // Nome do cliente em maiúsculas
                    medicamento.fabricante,                // CPF do cliente
                    medicamento.principioAtivo,
                    medicamento.dataValidade,
                    medicamento.preco
                ]);
    
                // Verifica se a resposta do banco contém pelo menos uma linha
                // Isso indica que o cliente foi inserido com sucesso
                if (respostaBD.rows.length > 0) {
                    // Exibe no console uma mensagem de sucesso com o ID do cliente cadastrado
                    console.info(`Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_medicamento}`);
    
                    // Retorna true indicando que o cadastro foi realizado com sucesso
                    return true;
                }
    
                // Se nenhuma linha foi retornada, significa que o cadastro falhou
                // Retorna false indicando falha na operação
                return false;
            } catch (error) {
                // Em caso de erro na execução da query, exibe uma mensagem de erro no console
                console.error(`Erro na consulta ao banco de dados. ${error}`);
    
                // Retorna false indicando que houve uma falha na operação
                return false;
            }
        }
    
}

export default Medicamento;