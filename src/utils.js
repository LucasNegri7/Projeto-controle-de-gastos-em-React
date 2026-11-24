// Funções auxiliares e constantes usadas em vários componentes

export const CATEGORIAS = {
  receita: ['Salário', 'Freelance', 'Bolsa/Estágio', 'Outros'],
  despesa: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Educação', 'Saúde', 'Outros'],
}

export const CORES_CATEGORIAS = [
  '#0f766e', '#2563eb', '#d97706', '#db2777', '#7c3aed', '#16a34a', '#64748b',
]

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}/${ano}`
}

export function hojeISO() {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}
