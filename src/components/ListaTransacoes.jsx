import ItemTransacao from './ItemTransacao'

/**
 * Renderiza a lista de transações usando .map().
 * Cada item precisa de uma "key" única para o React identificar o que mudou.
 */
function ListaTransacoes({ transacoes, onRemover }) {
  return (
    <div className="painel">
      <h2>Histórico ({transacoes.length})</h2>

      {transacoes.length === 0 ? (
        <p className="vazio">Nenhuma transação encontrada.</p>
      ) : (
        <ul className="lista">
          {transacoes.map((t) => (
            <ItemTransacao key={t.id} transacao={t} onRemover={onRemover} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaTransacoes
