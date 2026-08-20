import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { CompareContext } from "../components/CompareProvider"

export default function ComparePage() {
  const { compare, removeToCompare, clearCompare } = useContext(CompareContext)

  // Mostra la schermata "VUOTO" solo se non c'è NESSUN gioco (length === 0)
  if (!compare || compare.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Confronto Giochi ⚔️</h2>
        <p className="fs-5 text-muted mt-3">
          Non hai aggiunto alcun gioco al confronto.
        </p>
        <NavLink to="/" className="btn btn-primary mt-2">
          Torna alla Home per aggiungere giochi
        </NavLink>
      </div>
    )
  }

  // Prendi il primo gioco e (se esiste) il secondo gioco
  const game1 = compare[0]
  const game2 = compare[1] || null

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Confronto Dettagliato</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearCompare}>
          Svuota Confronto 🗑️
        </button>
      </div>

      {/* Avviso informativo se c'è 1 solo gioco */}
      {!game2 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
          <span>
            💡 Hai selezionato <strong>1 gioco</strong>. Aggiungine un altro dalla Home per effettuare il confronto affiancato!
          </span>
          <NavLink to="/" className="btn btn-sm btn-info text-white">
            + Aggiungi Secondo Gioco
          </NavLink>
        </div>
      )}

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "20%" }}>Caratteristica</th>
              <th>{game1.title}</th>
              
              {game2 ? (
                <th>{game2.title}</th>
              ) : (
                <th className="text-muted fw-normal"><i>Slot 2 vuoto</i></th>
              )}
            </tr>
          </thead>
          <tbody>
            
            <tr>
              <td className="fw-bold bg-light">Copertina</td>
              <td>
                <img
                  src={game1.coverUrl}
                  alt={game1.title}
                  style={{ maxHeight: "140px", objectFit: "contain" }}
                  className="img-fluid rounded"
                />
              </td>
              {game2 ? (
                <td>
                  <img
                    src={game2.coverUrl}
                    alt={game2.title}
                    style={{ maxHeight: "140px", objectFit: "contain" }}
                    className="img-fluid rounded"
                  />
                </td>
              ) : (
                <td className="text-muted align-middle">—</td>
              )}
            </tr>

            
            <tr>
              <td className="fw-bold bg-light">Categoria</td>
              <td>{game1.category}</td>
              <td>{game2 ? game2.category : "—"}</td>
            </tr>

           
            <tr>
              <td className="fw-bold bg-light">Prezzo</td>
              <td className="fw-bold text-success">{game1.price} €</td>
              <td className="fw-bold text-success">{game2 ? `${game2.price} €` : "—"}</td>
            </tr>

           
            <tr>
              <td className="fw-bold bg-light">Disponibilità</td>
              <td>
                {game1.inStock ? (
                  <span className="badge bg-success">Disponibile</span>
                ) : (
                  <span className="badge bg-danger">Esaurito</span>
                )}
              </td>
              <td>
                {game2 ? (
                  game2.inStock ? (
                    <span className="badge bg-success">Disponibile</span>
                  ) : (
                    <span className="badge bg-danger">Esaurito</span>
                  )
                ) : (
                  "—"
                )}
              </td>
            </tr>

           
            <tr>
              <td className="fw-bold bg-light">Piattaforme</td>
              <td>
                {game1.platforms?.map((p) => (
                  <span key={p} className="badge bg-secondary me-1">
                    {p}
                  </span>
                ))}
              </td>
              <td>
                {game2 ? (
                  game2.platforms?.map((p) => (
                    <span key={p} className="badge bg-secondary me-1">
                      {p}
                    </span>
                  ))
                ) : (
                  "—"
                )}
              </td>
            </tr>

           
            <tr>
              <td className="fw-bold bg-light">Valutazione / PEGI</td>
              <td>
                ⭐ {game1.rating} / 5 <br />
                <span className="badge bg-dark mt-1">PEGI {game1.pegi}</span>
              </td>
              <td>
                {game2 ? (
                  <>
                    ⭐ {game2.rating} / 5 <br />
                    <span className="badge bg-dark mt-1">PEGI {game2.pegi}</span>
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>

           
            <tr>
              <td className="fw-bold bg-light">Anno di Uscita</td>
              <td>{game1.releaseYear}</td>
              <td>{game2 ? game2.releaseYear : "—"}</td>
            </tr>

            {/* Descrizione */}
            <tr>
              <td className="fw-bold bg-light">Descrizione</td>
              <td className="text-start small">{game1.description}</td>
              <td className="text-start small">{game2 ? game2.description : "—"}</td>
            </tr>

            {/* Azioni */}
            <tr>
              <td className="fw-bold bg-light">Azione</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeToCompare(game1)}
                >
                  Rimuovi
                </button>
              </td>
              <td>
                {game2 ? (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeToCompare(game2)}
                  >
                    Rimuovi
                  </button>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}