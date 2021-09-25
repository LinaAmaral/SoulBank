import { Cliente } from './cliente'

export class ContaCorrente {
  numero!: number
  agencia!: number
  private titular!: Cliente
  private saldo!: number

  constructor(numero: number, agencia: number, titular: Cliente, saldo: number) {
    this.numero = numero
    this.agencia = agencia
    this.titular = titular
    this.saldo = saldo
  }
  setTitular(novoValor:any){
    if (novoValor instanceof Cliente){
      this.titular = novoValor
    }
  }
  getTitular(){
    return this.titular
  }
  getSaldo(){
    return this.saldo
  }
  sacar(valor:number){
    if (this.possuiSaldo(valor)){
      this.saldo -= valor;
      return valor
    }    
  }
  depositar(valor:number){
    if(valor <= 0){
      return
    }
    this.saldo += valor;
  }
  transferir(contaDestino:ContaCorrente, valor:number){
    if(this.possuiSaldo(valor)){
      this.sacar(valor)
      contaDestino.depositar(valor)
    }
  }
  possuiSaldo(valor:number):boolean{
    return this.saldo >= valor
  }
}