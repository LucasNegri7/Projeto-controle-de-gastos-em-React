import { useState, useEffect } from 'react'

/**
 * Hook personalizado: funciona como o useState, mas salva o valor
 * no localStorage do navegador. Assim os dados não somem ao recarregar a página.
 */
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo ? JSON.parse(salvo) : valorInicial
    } catch {
      return valorInicial
    }
  })

  // Sempre que "valor" mudar, grava no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // ignora erros (ex.: modo anônimo sem armazenamento)
    }
  }, [chave, valor])

  return [valor, setValor]
}
