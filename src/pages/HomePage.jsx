import { useContext, useMemo, useState } from "react"
import { GamesContext } from "../components/GamesProvider"
import { NavLink } from "react-router-dom"
import { FavoriteContext } from "../components/FavoriteProvider"
import { CompareContext } from "../components/CompareProvider"
import { SearchContext } from "../components/SearchProvider"
import { SortContext } from "../components/SortProvider"

const CATEGORIES = [
  "Avventura",
  "RPG",
  "Azione",
  "Platform",
  "Indie",
  "Sandbox"
]

export default function HomePage() {
  const { games } = useContext(GamesContext)
  const { isInFavorite, addToFavorite, removeTofavorite } = useContext(FavoriteContext)
  const { isInCompare, addToCompare, removeToCompare } = useContext(CompareContext)
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const { orderBy, setOrderBy } = useContext(SortContext)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = useMemo(() => {
    if (!games) return []
    return games.filter((game) => {
      const matchesSearch = (game.title || "")
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase().trim())

      const matchesCategory =
        selectedCategory === "all" ||
        (game.category || "").toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [games, searchQuery, selectedCategory])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const titleA = a.title || ""
      const titleB = b.title || ""

      if (orderBy === "asc") {
        return titleA.localeCompare(titleB)
      }
      if (orderBy === "desc") {
        return titleB.localeCompare(titleA)
      }

      return 0
    })
  }, [filteredProducts, orderBy])

  return (
    <div className="container my-4">
      <div className="row g-3 mb-4 align-items-end">
        <div className="col-md-5">
          <label htmlFor="search-input" className="form-label fw-bold small text-secondary">
            Cerca gioco
          </label>
          <input
            id="search-input"
            type="text"
            className="form-control"
            placeholder="Digita un titolo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="category-select" className="form-label fw-bold small text-secondary">
            Filtra Categoria
          </label>
          <select
            id="category-select"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Tutte le categorie</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="order-by-select" className="form-label fw-bold small text-secondary">
            Ordine Titolo
          </label>
          <select
            id="order-by-select"
            className="form-select"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="asc">A - Z (Crescente)</option>
            <option value="desc">Z - A (Decrescente)</option>
          </select>
        </div>
      </div>

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
              {sortedProducts.length > 0 ? (
                sortedProducts.map((game) => {
                  const isFav = isInFavorite(game)
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
                            className="btn btn-warning btn-sm fw-bold px-3"
                            onClick={() => removeToCompare(game)}
                            title="Rimuovi dal confronto"
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-warning btn-sm text-dark fw-bold px-3"
                            onClick={() => addToCompare(game)}
                            title="Aggiungi al confronto"
                          >
                            +
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted py-4">
                    Nessun gioco trovato con i filtri attuali.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}