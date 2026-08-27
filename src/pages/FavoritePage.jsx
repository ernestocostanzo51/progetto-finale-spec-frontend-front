import { useContext, useMemo } from "react"
import { NavLink } from "react-router-dom"
import { FavoriteContext } from "../components/FavoriteProvider"
import { SearchContext } from "../components/SearchProvider"
import { CompareContext } from "../components/CompareProvider"
import { SortContext } from "../components/SortProvider"

export default function FavoritePage() {
  const { favorite, removeTofavorite } = useContext(FavoriteContext)
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const { isInCompare, addToCompare, removeToCompare } = useContext(CompareContext)
  const { sortBy, setSortBy } = useContext(SortContext)

 
  const filtredFavorite = useMemo(() => {
    if (!favorite) return []
    return favorite.filter((game) =>
      (game.title || "").toLowerCase().startsWith(searchQuery.toLowerCase().trim())
    )
  }, [favorite, searchQuery])

  
  const sortedFavorite = useMemo(() => {
    return [...filtredFavorite].sort((a, b) => {
      const titleA = a.title || ""
      const titleB = b.title || ""
      const categoryA = a.category || ""
      const categoryB = b.category || ""

      if (sortBy === "title-asc") return titleA.localeCompare(titleB)
      if (sortBy === "title-desc") return titleB.localeCompare(titleA)
      if (sortBy === "category-asc") return categoryA.localeCompare(categoryB)
      if (sortBy === "category-desc") return categoryB.localeCompare(categoryA)
      return 0
    })
  }, [filtredFavorite, sortBy])

  return (
    <div className="container my-4">
     
      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca nei preferiti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title-asc">Titolo (A - Z)</option>
            <option value="title-desc">Titolo (Z - A)</option>
            <option value="category-asc">Categoria (A - Z)</option>
            <option value="category-desc">Categoria (Z - A)</option>
          </select>
        </div>
      </div>

     
      {!favorite || favorite.length === 0 ? (
        <div className="row text-center my-5">
          <div className="col">
            <p className="fs-4 text-muted">Non c'è niente nei preferiti</p>
            <NavLink to="/" className="btn btn-secondary mt-2">
              Torna alla Home
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <table className="table table-striped align-middle text-center">
              <thead>
                <tr>
                  <th className="text-start">Nome</th>
                  <th className="text-start">Categoria</th>
                  <th>Dettagli</th>
                  <th>Preferiti</th>
                  <th>Confronta</th>
                </tr>
              </thead>
              <tbody>
                {sortedFavorite.length > 0 ? (
                  sortedFavorite.map((game) => {
                    const isComp = isInCompare(game)

                    return (
                      <tr key={game.id}>
                        <td className="text-start">{game.title}</td>
                        <td className="text-start">{game.category}</td>
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
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-muted py-4">
                      Nessun gioco trovato nei preferiti.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}