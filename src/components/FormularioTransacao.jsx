import { useState } from 'react'
import { CATEGORIAS, hojeISO } from '../utils'

/**
 * Formulário controlado: cada campo tem seu valor guardado no estado do componente.
 * Ao enviar, valida os dados e chama a função recebida pela prop "onAdicionar".
 */
function FormularioTransacao({ onAdicionar }) {
  const [tipo, setTipo] = useState('despesa')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIAS.despesa[0])
  const [data, setData] = useState(hojeISO())
  const [erro, setErro] = useState('')

  function mudarTipo(novoTipo) {
    setTipo(novoTipo)
    setCategoria(CATEGORIAS[novoTipo][0]) // reinicia a categoria para uma válida
  }

  function enviar(evento) {
    evento.preventDefault() // evita o recarregamento da página

    const valorNumerico = parseFloat(String(valor).replace(',', '.'))

    if (!descricao.trim()) {
      setErro('Informe uma descrição.')
      return
    }
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setErro('Informe um valor maior que zero.')
      return
    }

    onAdicionar({
      tipo,
      descricao: descricao.trim(),
      valor: valorNumerico,
      categoria,
      data,
    })

    // limpa o formulário
    setDescricao('')
    setValor('')
    setErro('')
  }

  return (
    <form className="painel formulario" onSubmit={enviar}>
      <h2>Nova transação</h2>

      <div className="alternador">
        <button
          type="button"
          className={tipo === 'receita' ? 'ativo receita' : ''}
          onClick={() => mudarTipo('receita')}
        >
          Receita
        </button>
        <button
          type="button"
          className={tipo === 'despesa' ? 'ativo despesa' : ''}
          onClick={() => mudarTipo('despesa')}
        >
          Despesa
        </button>
      </div>

      <label>
        Descrição
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex.: Mercado, salário..."
        />
      </label>

      <div className="linha">
        <label>
          Valor (R$)
          <input
            type="number"
            step="0.01"
            min="0"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0,00"
          />
        </label>
        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>
      </div>

      <label>
        Categoria
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {CATEGORIAS[tipo].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" className="botao-principal">
        Adicionar
      </button>
    </form>
  )
}

export default FormularioTransacao
