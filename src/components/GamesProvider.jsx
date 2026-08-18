import { createContext } from "react"

const GamesContext = createContext()



export default function ProductsProvider({ childern }){

    const FetchGames = async() => {
    try{
        const response = await fetch("http://localhost:3001/products/")
        if(!response.ok){
            throw new Error (response.status)
        }


    }catch{

    }
}
    
       
    

    
}