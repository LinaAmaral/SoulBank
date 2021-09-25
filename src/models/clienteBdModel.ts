import mongoose from "mongoose";

interface ClientesBdModel {
    nomeCompleto: string,
    cpf: string
}
const schemaCliente = new mongoose.Schema<ClientesBdModel>({
    nomeCompleto: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    }
})

export const ClienteModel = mongoose.model<ClientesBdModel>('Cliente', schemaCliente);

