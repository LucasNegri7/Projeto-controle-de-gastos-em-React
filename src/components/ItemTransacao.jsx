import { formatarMoeda, formatarData } from '../utils'

/** Uma linha da lista de transações. */
function ItemTransacao({ transacao, onRemover }) {
  const { id, tipo, descricao, valor, categoria, data } = transacao
  const sinal = tipo === 'receita' ? '+' : '-'

  return (
    <li className={`item item-${tipo}`}>
      <div className="item-info">
        <strong>{descricao}</strong>
        <small>
          {categoria} · {formatarData(data)}
        </small>
      </div>
      <span className="item-valor">
        {sinal} {formatarMoeda(valor)}
      </span>
      <button
        type="button"
        className="botao-remover"
        onClick={() => onRemover(id)}
        title="Remover"
        aria-label={`Remover ${descricao}`}
      >
        ✕
      </button>
    </li>
  )
}

export default ItemTransacao
