import { createContext, useState } from "react"

export const SortContext = createContext()

export default function SortProvider({ children }) {
  
  const [sortBy, setSortBy] = useState("title")
  const [orderdBy , setOrderBy] = useState("")

  
  

  return (
    <SortContext.Provider
      value={{
        sortBy,
        setSortBy,
        orderdBy,
        setOrderBy
      }}
    >
      {children}
    </SortContext.Provider>
  )
}