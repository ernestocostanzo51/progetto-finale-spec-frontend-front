import { useContext, useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { CompareContext } from "../components/CompareProvider"

export default function ComparePage() {
  const { compare, removeToCompare, clearCompare } = useContext(CompareContext)

  
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    
    if (!compare || compare.length === 0) {
      setDetails([])
      return
    }

    const fetchDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const promises = compare.map((item) =>
          fetch(`http://localhost:3001/products/${item.id || item}`)
            .then((res) => {
              if (!res.ok) throw new Error("Errore nel recupero dati")
              return res.json()
            })
            .then((json) => {
              if (json.data) return json.data
              if (json.product) return json.product
              if (Array.isArray(json)) return json[0]
              return json
            })
        )

        const results = await Promise.all(promises)

        setDetails(results)
      } catch (err) {
        setError("Impossibile caricare le specifiche dei giochi.")
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [compare])

  
  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Caricamento dettagli in corso...</p>
      </div>
    )
  }


  if (error) {
    return (
      <div className="container my-5 text-center text-danger">
        <h4>{error}</h4>
        <button className="btn btn-outline-primary mt-3" onClick={() => window.location.reload()}>
          Riprova
        </button>
      </div>
    )
  }

 
  if (!details || details.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Confronto Giochi </h2>
        <p className="fs-5 text-muted mt-3">Non hai aggiunto alcun gioco al confronto.</p>
        <NavLink to="/" className="btn btn-secondary mt-2">
          Torna alla Home per aggiungere giochi
        </NavLink>
      </div>
    )
  }

  
  const game1 = details[0]
  const game2 = details[1] || null


  const getIndicator = (val1, val2, higherIsBetter = true) => {
    if (!game2 || val1 === undefined || val2 === undefined || val1 === val2) {
      return { icon1: null, icon2: null }
    }
    const isVal1Better = higherIsBetter ? val1 > val2 : val1 < val2
    return {
      icon1: isVal1Better ? <span className="text-success fw-bold ms-1">🟢 ⬆️</span> : <span className="text-danger fw-bold ms-1">🔴 ⬇️</span>,
      icon2: !isVal1Better ? <span className="text-success fw-bold ms-1">🟢 ⬆️</span> : <span className="text-danger fw-bold ms-1">🔴 ⬇️</span>
    }
  }

  const priceInd = getIndicator(game1?.price, game2?.price, false)
  const ratingInd = getIndicator(game1?.rating, game2?.rating, true)
  const yearInd = getIndicator(game1?.releaseYear || game1?.year, game2?.releaseYear || game2?.year, true)

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Confronto Dettagliato</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearCompare}>
          Svuota Confronto 🗑️
        </button>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "20%" }}>Caratteristica</th>
              <th>{game1?.title || game1?.name || "Senza Titolo"}</th>
              <th>{game2 ? (game2?.title || game2?.name || "Senza Titolo") : <i>Slot 2 vuoto</i>}</th>
            </tr>
          </thead>
          <tbody>
            {/* Copertina */}
            <tr>
              <td className="fw-bold bg-light">Copertina</td>
              <td>
                <img
                  src={game1?.coverUrl || game1?.cover || game1?.image || "https://via.placeholder.com/150"}
                  alt={game1?.title}
                  style={{ maxHeight: "140px", objectFit: "contain" }}
                  className="img-fluid rounded"
                />
              </td>
              <td>
                {game2 ? (
                  <img
                    src={game2?.coverUrl || game2?.cover || game2?.image || "https://via.placeholder.com/150"}
                    alt={game2?.title}
                    style={{ maxHeight: "140px", objectFit: "contain" }}
                    className="img-fluid rounded"
                  />
                ) : (
                  "—"
                )}
              </td>
            </tr>

            {/* Categoria */}
            <tr>
              <td className="fw-bold bg-light">Categoria</td>
              <td>{game1?.category || "N/D"}</td>
              <td>{game2 ? (game2?.category || "N/D") : "—"}</td>
            </tr>

            {/* Prezzo */}
            <tr>
              <td className="fw-bold bg-light">Prezzo</td>
              <td className="fw-bold">{game1?.price !== undefined ? `${game1.price} €` : "N/D"} {priceInd.icon1}</td>
              <td className="fw-bold">{game2 ? (game2?.price !== undefined ? `${game2.price} €` : "N/D") : "—"} {priceInd.icon2}</td>
            </tr>

            {/* Valutazione / PEGI */}
            <tr>
              <td className="fw-bold bg-light">Valutazione / PEGI</td>
              <td>
                ⭐ {game1?.rating ?? "N/D"} / 5 {ratingInd.icon1} <br />
                <span className="badge bg-dark mt-1">PEGI {game1?.pegi ?? "N/D"}</span>
              </td>
              <td>
                {game2 ? (
                  <>
                    ⭐ {game2?.rating ?? "N/D"} / 5 {ratingInd.icon2} <br />
                    <span className="badge bg-dark mt-1">PEGI {game2?.pegi ?? "N/D"}</span>
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>

            {/* Anno di Uscita */}
            <tr>
              <td className="fw-bold bg-light">Anno di Uscita</td>
              <td>{game1?.releaseYear ?? game1?.year ?? "N/D"} {yearInd.icon1}</td>
              <td>{game2 ? <>{game2?.releaseYear ?? game2?.year ?? "N/D"} {yearInd.icon2}</> : "—"}</td>
            </tr>

            {/* Azioni */}
            <tr>
              <td className="fw-bold bg-light">Azione</td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeToCompare(game1)}>
                  Rimuovi
                </button>
              </td>
              <td>
                {game2 ? (
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeToCompare(game2)}>
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