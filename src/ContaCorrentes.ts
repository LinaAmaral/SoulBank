import { Clientes } from './Clientes'

export class ContaCorrentes {
  numero!: number
  agencia!: number
  private titular!: Clientes
  private saldo!: number

  constructor(numero: number, agencia: number, titular: Clientes, saldo: number) {
    this.numero = numero
    this.agencia = agencia
    this.titular = titular
    this.saldo = saldo
  }
  setTitular(novoValor:any){
    if (novoValor instanceof Clientes){
      this.titular = novoValor
    }
  }
  getTitular():Clientes{
    return this.titular
  }
  getSaldo():number{
    return this.saldo
  }
  sacar(valor:number):number | undefined{
    if (this.possuiSaldo(valor)){
      this.saldo -= valor;
      return valor
    }    
  }
  depositar(valor:number):undefined{
    if(valor <= 0){
      return
    }
    this.saldo += valor;
  }
  transferir(contaDestino:ContaCorrentes, valor:number):void{
    if(this.possuiSaldo(valor)){
      this.sacar(valor)
      contaDestino.depositar(valor)
    }
  }
  possuiSaldo(valor:number):boolean{
    return this.saldo >= valor
  }
}