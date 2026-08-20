import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { FavoriteContext } from "../components/FavoriteProvider"

export default function FavoritePage() {
  const { favorite, removeTofavorite } = useContext(FavoriteContext)

  return (
    <div className="container my-4">
      {!favorite || favorite.length === 0 ? (
        <div className="row text-center my-5">
          <div className="col">
            <p className="fs-4 text-muted">Non ci sta niente nei preferiti</p>
            <NavLink to="/" className="btn btn-secondary mt-2">
              Torna alla Home
            </NavLink>
          </div>
        </div>
      ) : (
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
                {favorite.map((game) => (
                  <tr key={game.id}>
                    <td>{game.title}</td>
                    <td>{game.category}</td>
                    <td>
                      <NavLink
                        to={`/products/${game.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        VEDI
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeTofavorite(game)}
                      >
                        ❤️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}