import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GamesContext } from "../components/GamesProvider"
import { FavoriteContext } from "../components/FavoriteProvider"
import { CompareContext } from "../components/CompareProvider"

export default function DetailsPage() {
  const { id } = useParams()
  const { singleGame, fetchSingleGame } = useContext(GamesContext)
  const { isInFavorite, addToFavorite, removeTofavorite } = useContext(FavoriteContext)
  const { isInCompare, addToCompare, removeToCompare } = useContext(CompareContext)

  useEffect(() => {
    if (id) {
      fetchSingleGame(id)
    }
  }, [id])

  if (!singleGame) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
        <p className="mt-2">Caricamento dettagli gioco...</p>
      </div>
    )
  }

  // Usa singleGame al posto di game
  const isFav = isInFavorite(singleGame)
  const isComp = isInCompare(singleGame)

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <div className="card">                  
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">{singleGame.title}</h3>
              <strong className="badge bg-danger fs-6">PEGI: {singleGame.pegi}</strong>
            </div>

            <div className="card-body">
              <h5 className="card-subtitle mb-3 text-muted">Genere: {singleGame.category}</h5>
              <p className="card-text">{singleGame.description}</p>
              <p className="card-text"><strong>Anno di uscita: </strong>{singleGame.releaseYear}</p>
              <p className="card-text"><strong>Rating: </strong>{singleGame.rating}</p>
              <p className="card-text"><strong>Prezzo: </strong>{singleGame.price} Euro</p>
              
              <p className="card-text mb-2"><strong>Disponibile nelle seguenti piattaforme:</strong></p>
              <div className="mb-4">
                {singleGame.platforms && singleGame.platforms.map((platform, index) => (
                  <span key={index} className="badge bg-secondary me-1">
                    {platform}
                  </span>
                ))}
              </div>

              {/* Pulsanti Preferiti e Confronta */}
              <div className="d-flex gap-2">
                {isFav ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeTofavorite(singleGame)}
                  >
                    ❤️ Rimuovi dai Preferiti
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => addToFavorite(singleGame)}
                  >
                    🤍 Aggiungi ai Preferiti
                  </button>
                )}

                {isComp ? (
                  <button
                    className="btn btn-warning btn-sm fw-bold"
                    onClick={() => removeToCompare(singleGame)}
                    title="Rimuovi dal confronto"
                  >
                    - Rimuovi da Confronta
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning btn-sm text-dark fw-bold"
                    onClick={() => addToCompare(singleGame)}
                    title="Aggiungi al confronto"
                  >
                    + Aggiungi a Confronta
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}