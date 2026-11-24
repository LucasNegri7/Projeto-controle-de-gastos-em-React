import { formatarMoeda } from '../utils'

/**
 * Exibe três cartões: total de receitas, total de despesas e saldo.
 * Recebe os valores prontos via props (componente apenas de apresentação).
 */
function Resumo({ receitas, despesas, saldo }) {
  return (
    <div className="resumo">
      <div className="cartao cartao-receita">
        <span>Receitas</span>
        <strong>{formatarMoeda(receitas)}</strong>
      </div>
      <div className="cartao cartao-despesa">
        <span>Despesas</span>
        <strong>{formatarMoeda(despesas)}</strong>
      </div>
      <div className={`cartao cartao-saldo ${saldo < 0 ? 'negativo' : ''}`}>
        <span>Saldo</span>
        <strong>{formatarMoeda(saldo)}</strong>
      </div>
    </div>
  )
}

export default Resumo
