import { createContext, useState, useRef } from "react"

export const FavoriteContext = createContext()

export default function FavoriteProvider({ children }) {
  const [favorite, setFavorite] = useState([])
  const [toastMessage, setToastMessage] = useState("")
  
  
  const timerRef = useRef(null)

  
  const showToast = (message) => {
    
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setToastMessage(message)

   
    timerRef.current = setTimeout(() => {
      setToastMessage("")
    }, 2500)
  }

  const isInFavorite = (game) => {
    if (!game) return false
    return favorite.some((fav) => fav.id === game.id)
  }

  const addToFavorite = (game) => {
    if (!game) return
    if (!isInFavorite(game)) {
      setFavorite((prev) => [...prev, game])
      showToast(`"${game.title}" aggiunto ai preferiti! ❤️`)
    }
  }

  const removeTofavorite = (game) => {
    if (!game) return
    setFavorite((prev) => prev.filter((fav) => fav.id !== game.id))
    showToast(`"${game.title}" rimosso dai preferiti!`)
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
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