import Medicamento from "../model/Medicamento.js";
import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import type { Request, Response } from "express";


class MedicamentoController extends Medicamento {   
    
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarCarros da classe Carro para buscar todos os carros no banco de dados
            const listaMedicamento: Array<Medicamento> | null = await Medicamento.listarMedicamentos();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de carros em formato JSON
            return res.status(200).json(listaMedicamento);

        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar medicamento. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de medicamento." });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo cliente na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface CarroDTO
            const dadosRecebidosMedicamento = req.body;

            // validação de dados ...

            // Chama o método cadastrarCarro da classe Carro, passando os dados recebidos
            // Esse método deve inserir o carro no banco de dados e retornar true ou false
            const respostaMedicamento = await Medicamento.cadastrarMedicamento(dadosRecebidosMedicamento);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaMedicamento) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o carro foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar medicamento." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no medicamento. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo carro
            return res.status(500).json({ mensagem: "Não foi possível inserir o medicamento." });
        }
    }

}    

export default MedicamentoController;




