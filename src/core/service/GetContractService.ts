import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import BaseService from "./BaseService";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class GetContractService implements BaseService {
    public async execute(): Promise<{ contractBase64: string }> {
        const filePath = join(__dirname, '../../../documents/CONTRATO DE COMPROMISSO DE INVESTIMENTO EM FUNDO DE PENSÃO.txt');

        try {
            await fs.access(filePath);
        } catch (error) {
            throw new Error("Arquivo não encontrado");
        }

        const fileBuffer = await fs.readFile(filePath);
        const base64String = fileBuffer.toString('base64');

        return {
            contractBase64: base64String
        };
    }
}