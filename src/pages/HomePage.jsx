import { useContext } from "react"
import {GamesContext} from "../components/GamesProvider"
import { NavLink } from "react-router-dom"



export default function HomePage(){

    const { games } = useContext(GamesContext)
    
    return(
  <div className="container">
  <div className="row">
    <div className="col">
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="w-55">Nome</th>
            <th className="w-45">Categoria</th>
            <th>Dettagli</th>
          </tr>
        </thead>
        <tbody>
          {games && games.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.category}</td>
              <td>
                <NavLink to={`/products/${game.id}`} className="btn btn-secondary btn-sm">
                      VEDI
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
    )
}