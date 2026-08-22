import { createContext } from "react"
import { useState } from "react"

export const SearchContext = createContext()
export default function SearchProvider({children}){

    const [searchQuery, setSearchQuery] = useState("")
    const clearSearch = () => setSearchQuery("")


    return(
<SearchContext.Provider value={{
    searchQuery,
    setSearchQuery,
    clearSearch
}}>
{children}
</SearchContext.Provider>

    )
}