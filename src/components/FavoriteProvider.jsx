import { createContext } from "react";
import { useState, useEffect } from "react";

export const FavoriteContext = createContext()
export default function FavoriteProvider({ children }){

    const [favorite, setFavorite] = useState(() => {
      const saved = localStorage.getItem("favoritelist")
      return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
    localStorage.setItem("favoritelist", JSON.stringify(favorites));
  }, [favorite]);



    const addToFavorite = (game) => {
        
        return setFavorite((prev) => {
            const exist = favorite.some((item) => item.id === game.id)
            if(exist){
                return prev
            }
            else{
                return [...prev , game]
            }
        })
    }

    const removeTofavorite = (game) => {
        return setFavorite((prev) => {
            prev.filter(item => item.id !== game.id)
        })
    }

    const isInFavorite = (game) => {
        return favorite.some((item) => item.id === game.id)
    }

    return(
        <FavoriteContext.Provider value={{
            isInFavorite,
            addToFavorite,
            removeTofavorite,
            favorite,
            setFavorite
        }}>
            {children}
        </FavoriteContext.Provider>
    )
}