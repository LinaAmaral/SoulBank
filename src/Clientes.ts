interface IClientes {
  nomeCompleto: string,
  cpf: string,
}
export class Clientes implements IClientes {
  nomeCompleto!: string
  cpf!: string

  constructor(nomeCompleto: string, cpf: string) {
    this.nomeCompleto = nomeCompleto
    this.cpf = cpf
  }
  escreverPropriedades() {
    console.log(this.nomeCompleto)
    console.log(this.cpf)
  }
  getnomeCompleto() {
    return this.nomeCompleto;
  }
  setnomeCompleto(nomeCompleto: string) {
    this.nomeCompleto = nomeCompleto;
  }
  getCpf() {
    return this.cpf;
  }
  setCpf(cpf: string) {
    this.cpf = cpf;
  }
}
