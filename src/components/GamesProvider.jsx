import { createContext, useState, useEffect } from "react"

const GamesContext = createContext()



export default function ProductsProvider({ childern }){

    const [games , setGames] = useState([])

    const FetchGames = async() => {
    try{
        const response = await fetch("http://localhost:3001/products/")
        if(!response.ok){
            throw new Error (`errore http ${response.status}`)
        }

        const data = await response.json()
        setGames(data)


    }catch(error){
        if(error instanceof Error){
            console.error(error)
        }
        else{
            console.error
        }

    }
}

return(
    <GamesContext.Provider value={
        games,
        setGames,
        FetchGames
    }
    ></GamesContext.Provider>
)
    
       
    

    
}