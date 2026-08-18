import { useContext } from "react"
import {GamesContext} from "../components/GamesProvider"



export default function HomePage(){

    const { games } = useContext(GamesContext)
    
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                games.map((game) => (
                                    <tr key={game.id}>
                                        <td>{game.title}</td>
                                        <td>{game.category}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </div>
                </div>
            </div>
        </div>
    )
}