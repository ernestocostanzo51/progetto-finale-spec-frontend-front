import { createContext, useState, useEffect } from "react"

export const GamesContext = createContext()



export default function ProductsProvider({ children }){

    const [games , setGames] = useState([])
    const [singleGame , setSingleGame] = useState(null)

const FetchGames = async() =>{
        try{
            const response =  await fetch("http://localhost:3001/products/")
            if(!response.ok){
                throw new Error (`errore http ${response.status}`)
            }
            const data =  await response.json()
            setGames(data)
        }catch(error){
            if(error instanceof Error){
                console.error("errore numero:" , error)
            }
            else{
                console.error(error)
            }
        }
    }

    const fetchSingleGame = async (id) => {

        try{
            const response = await fetch(`http://localhost:3001/products/${id}`)
            if(!response.ok){
                throw new Error("errore http" , response.status)
            }
            const data = await response.json()
            setSingleGame(data.product)
        }catch(error){
            if(error instanceof Error){
                console.error("errore" , error)
            }else{
                console.error(error)
            }
        }
    }
useEffect(() => {
    FetchGames()
} , [])

return(
    <GamesContext.Provider value={{
        games,
        setGames,
        FetchGames,
        singleGame,
        setSingleGame,
        fetchSingleGame
    }}
    >{children}</GamesContext.Provider>
)
    

}