import { createContext, useState, useEffect, useRef } from "react"

export const FavoriteContext = createContext()

export default function FavoriteProvider({ children }) {
  const [favorite, setFavorite] = useState(() => {
    const saved = localStorage.getItem("favorite")
    if (!saved) return []
    try {
      const parsed = JSON.parse(saved)
      // Filtra via eventuali valori null/undefined salvati in precedenza
      return Array.isArray(parsed) ? parsed.filter((item) => item && item.id) : []
    } catch {
      return []
    }
  })

  const [toastMessage, setToastMessage] = useState("")
  const timerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite))
  }, [favorite])

  const showToast = (message) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToastMessage(message)
    timerRef.current = setTimeout(() => setToastMessage(""), 2500)
  }

  const isInFavorite = (game) => {
    if (!game || !game.id) return false
    return favorite.some((fav) => fav && fav.id === game.id)
  }

  const addToFavorite = (game) => {
    if (!game || !game.id) return
    const exist = favorite.find((element) => element && element.id === game.id)

    if (!exist) {
      setFavorite([...favorite, game])
      showToast(`"${game.title}" aggiunto ai preferiti! ❤️`)
    }
  }

  const removeTofavorite = (game) => {
    if (!game || !game.id) return
    setFavorite((prev) => prev.filter((fav) => fav && fav.id !== game.id))
    showToast(`"${game.title}" rimosso dai preferiti!`)
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        favorites: favorite,
        isInFavorite,
        addToFavorite,
        removeTofavorite,
      }}
    >
      {children}

      {toastMessage && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-4 text-bg-dark border-0 shadow-lg"
          style={{ zIndex: 1050, pointerEvents: "none" }}
        >
          <div className="d-flex align-items-center justify-content-between p-2">
            <div className="toast-body fs-6">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2"
              style={{ pointerEvents: "auto" }}
              onClick={() => setToastMessage("")}
            ></button>
          </div>
        </div>
      )}
    </FavoriteContext.Provider>
  )
}