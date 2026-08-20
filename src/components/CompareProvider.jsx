import { createContext } from "react"
import { useState, useEffect } from "react"


export const CompareContext = createContext()

export default function CompareProvider({ children }){

    const [compare , setCompare] = useState(() => {
        const saved = localStorage.getItem("compareList")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("compareList" , JSON.stringify(compare))
    } , [compare])

    const addToCompare = (game) => {
        return setCompare((prev) => {
            const exist = prev.some(item => item.id === game.id)

            if(prev.length >= 2){
                return prev
            }

            if(!exist){
                return [...prev , game]
            }
            return prev

        })
    }

    const removeToCompare = (game) => {
        return setCompare((prev) => {
           return prev.filter(item => item.id !== game.id)
        })
    }

    const isInCompare = (game) => {
        return compare.some(item => item.id === game.id)
        }
    

    const clearCompare = () => {
     setCompare([])
     }
    

    



    return(
        <CompareContext.Provider value = {{
            compare,
            addToCompare,
            removeToCompare,
            clearCompare,
            isInCompare
        }}>
            {children}
        </CompareContext.Provider>

    )
}
