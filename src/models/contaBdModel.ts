
import mongoose from "mongoose";

interface ContaCorrentesBdModel {
    numero: number,
    agencia: number,
    saldo: number,
    cpfTitular: string
}

const schemaContaCorrente = new mongoose.Schema<ContaCorrentesBdModel>({
    numero: {
        type: Number,
        required: true,
    },
    agencia: {
        type: Number,
        required: true,
    },
    saldo: {
        type: Number,
        required: true,
    },
    cpfTitular: {
        type: String,
        required: true,
    },
})

export const ContaCorrenteModel = mongoose.model<ContaCorrentesBdModel>('ContaCorrente', schemaContaCorrente);