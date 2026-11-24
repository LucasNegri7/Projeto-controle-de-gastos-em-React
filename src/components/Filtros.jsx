/**
 * Filtros da lista. O estado fica no App (componente pai);
 * aqui só exibimos os valores e avisamos o pai quando algo muda ("lifting state up").
 */
function Filtros({ tipo, mes, onMudarTipo, onMudarMes }) {
  return (
    <div className="painel filtros">
      <label>
        Tipo
        <select value={tipo} onChange={(e) => onMudarTipo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="receita">Receitas</option>
          <option value="despesa">Despesas</option>
        </select>
      </label>
      <label>
        Mês
        <input type="month" value={mes} onChange={(e) => onMudarMes(e.target.value)} />
      </label>
      {mes && (
        <button type="button" className="botao-limpar" onClick={() => onMudarMes('')}>
          Limpar mês
        </button>
      )}
    </div>
  )
}

export default Filtros
