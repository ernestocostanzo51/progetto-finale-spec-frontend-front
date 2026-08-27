import { useContext, useMemo } from "react"
import { NavLink } from "react-router-dom"
import { FavoriteContext } from "../components/FavoriteProvider"
import { SearchContext } from "../components/SearchProvider"
import { CompareContext } from "../components/CompareProvider"
import { SortContext } from "../components/SortProvider"
import { useState } from "react"

export default function FavoritePage() {
  const { favorite, removeTofavorite } = useContext(FavoriteContext)
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const { isInCompare, addToCompare, removeToCompare } = useContext(CompareContext)
  const { sortBy, setSortBy, orderBy , setOrderBy } = useContext(SortContext)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const CATEGORIES = [
  "Avventura",
  "RPG",
  "Azione",
  "Platform",
  "Indie",
  "Sandbox"
]

 
   const filtredFavorite = useMemo(() => {
    return favorite.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase().trim())

      const matchesCategory =
        selectedCategory === "all" ||
        favorite.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [favorite, searchQuery, selectedCategory])

  
  const sortedFavorite = useMemo(() => {
    return [...filtredFavorite].sort((a, b) => {
      const titleA = a.title
      const titleB = b.title
      const categoryA = a.category 
      const categoryB = b.category 

    if(orderBy === "asc") return titleA.localeCompare(titleB)
    if(orderBy === "desc") return titleB.localeCompare(titleA)  
      
    })
  }, [filtredFavorite, sortBy])

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