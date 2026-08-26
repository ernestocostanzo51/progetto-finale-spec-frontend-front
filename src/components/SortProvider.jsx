import { createContext, useState } from "react"

export const SortContext = createContext()

export default function SortProvider({ children }) {
  
  const [sortBy, setSortBy] = useState("title")
  
  
  const [orderBy, setOrderBy] = useState("asc")

  return (
    <SortContext.Provider
      value={{
        sortBy,
        setSortBy,
        orderBy,
        setOrderBy,
      }}
    >
      {children}
    </SortContext.Provider>
  )
}