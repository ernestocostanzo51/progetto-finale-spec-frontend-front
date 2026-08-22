import { useContext } from "react"
import { GamesContext } from "../components/GamesProvider"
import { NavLink } from "react-router-dom"
import { FavoriteContext } from "../components/FavoriteProvider"
import { CompareContext } from "../components/CompareProvider"
import { SearchContext } from "../components/SearchProvider"

export default function HomePage() {
  const { games } = useContext(GamesContext)
  const { isInFavorite, addToFavorite, removeTofavorite } = useContext(FavoriteContext)
  const { isInCompare , addToCompare , removeToCompare} = useContext(CompareContext)
  const { }
  

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Dettagli</th>
                <th>Preferiti</th>
              </tr>
            </thead>
            <tbody>
              {games &&
                games.map((game) => {
                  const isFav = isInFavorite(game)
                  const isComp = isInCompare(game)

                  return (
                    <tr key={game.id}>
                      <td>{game.title}</td>
                      <td>{game.category}</td>
                      <td>
                        <NavLink to={`/products/${game.id}`} className="btn btn-secondary btn-sm">
                          VEDI
                        </NavLink>
                      </td>
                      <td>
                        {isFav ? (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeTofavorite(game)}
                          >
                            ❤️
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => addToFavorite(game)}
                          >
                            🤍
                          </button>
                        )}
                      </td>
                      <td>
                        {isComp ? (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => removeToCompare(game)}
                          >
                             Rimuovi
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-warning btn-sm text-dark"
                            onClick={() => addToCompare(game)}
                          >
                             Confronta
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}