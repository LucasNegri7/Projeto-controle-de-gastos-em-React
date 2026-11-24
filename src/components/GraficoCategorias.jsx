import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CORES_CATEGORIAS, formatarMoeda } from '../utils'

/**
 * Gráfico de pizza com as despesas agrupadas por categoria.
 * Usa a biblioteca Recharts, que também é feita de componentes React.
 */
function GraficoCategorias({ transacoes }) {
  const dados = useMemo(() => {
    const porCategoria = {}
    transacoes
      .filter((t) => t.tipo === 'despesa')
      .forEach((t) => {
        porCategoria[t.categoria] = (porCategoria[t.categoria] || 0) + t.valor
      })
    return Object.entries(porCategoria)
      .map(([nome, valor]) => ({ nome, valor }))
      .sort((a, b) => b.valor - a.valor)
  }, [transacoes])

  return (
    <div className="painel">
      <h2>Despesas por categoria</h2>
      {dados.length === 0 ? (
        <p className="vazio">Adicione despesas para ver o gráfico.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={dados} dataKey="valor" nameKey="nome" innerRadius={55} outerRadius={90} paddingAngle={2}>
              {dados.map((item, i) => (
                <Cell key={item.nome} fill={CORES_CATEGORIAS[i % CORES_CATEGORIAS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatarMoeda(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default GraficoCategorias
