import { useState, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Resumo from './components/Resumo'
import FormularioTransacao from './components/FormularioTransacao'
import Filtros from './components/Filtros'
import ListaTransacoes from './components/ListaTransacoes'
import GraficoCategorias from './components/GraficoCategorias'

/**
 * Componente principal. Guarda o estado da aplicação (lista de transações e filtros)
 * e repassa dados e funções para os componentes filhos através de props.
 */
function App() {
  // Estado persistido no navegador
  const [transacoes, setTransacoes] = useLocalStorage('transacoes', [])

  // Estado dos filtros (não precisa ser salvo)
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtroMes, setFiltroMes] = useState('')

  function adicionarTransacao(nova) {
    setTransacoes((anteriores) => [{ ...nova, id: crypto.randomUUID() }, ...anteriores])
  }

  function removerTransacao(id) {
    setTransacoes((anteriores) => anteriores.filter((t) => t.id !== id))
  }

  // useMemo: só recalcula a lista filtrada quando transações ou filtros mudam
  const transacoesFiltradas = useMemo(() => {
    return transacoes
      .filter((t) => filtroTipo === 'todos' || t.tipo === filtroTipo)
      .filter((t) => !filtroMes || t.data.startsWith(filtroMes))
      .sort((a, b) => b.data.localeCompare(a.data))
  }, [transacoes, filtroTipo, filtroMes])

  // Valores derivados do estado (calculados, não armazenados)
  const totais = useMemo(() => {
    const receitas = transacoesFiltradas
      .filter((t) => t.tipo === 'receita')
      .reduce((soma, t) => soma + t.valor, 0)
    const despesas = transacoesFiltradas
      .filter((t) => t.tipo === 'despesa')
      .reduce((soma, t) => soma + t.valor, 0)
    return { receitas, despesas, saldo: receitas - despesas }
  }, [transacoesFiltradas])

  return (
    <div className="container">
      <header className="cabecalho">
        <h1>💰 Controle de Gastos</h1>
        <p>Organize suas receitas e despesas de forma simples</p>
      </header>

      <Resumo {...totais} />

      <main className="grade">
        <section className="coluna">
          <FormularioTransacao onAdicionar={adicionarTransacao} />
          <GraficoCategorias transacoes={transacoesFiltradas} />
        </section>

        <section className="coluna">
          <Filtros
            tipo={filtroTipo}
            mes={filtroMes}
            onMudarTipo={setFiltroTipo}
            onMudarMes={setFiltroMes}
          />
          <ListaTransacoes transacoes={transacoesFiltradas} onRemover={removerTransacao} />
        </section>
      </main>

      <footer className="rodape">Projeto acadêmico desenvolvido com React + Vite</footer>
    </div>
  )
}

export default App
