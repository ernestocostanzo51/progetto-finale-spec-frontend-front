import { createContext, useState, useEffect, useRef } from "react"

export const CompareContext = createContext()

export default function CompareProvider({ children }) {
  const [compare, setCompare] = useState(() => {
    const saved = localStorage.getItem("compareList")
    return saved ? JSON.parse(saved) : []
  })

  const [toastMessage, setToastMessage] = useState("")
  const timerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compare))
  }, [compare])

  const showText = (message) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setToastMessage(message)
    timerRef.current = setTimeout(() => {
      setToastMessage("")
    }, 2500)
  }

  const isInCompare = (game) => {
    if (!game) return false
    return compare.some((item) => item.id === game.id)
  }

  const addToCompare = (game) => {
    if (!game) return

    if (isInCompare(game)) {
      return
    }

    if (compare.length >= 2) {
      showText("Puoi confrontare al massimo 2 giochi alla volta!")
      return
    }

    setCompare((prev) => [...prev, game])
    showText(`"${game.title}" aggiunto al comparatore! `)
  }

  const removeToCompare = (game) => {
    if (!game) return
    setCompare((prev) => prev.filter((item) => item.id !== game.id))
    showText(`"${game.title}" rimosso dal comparatore!`)
  }

  const clearCompare = () => {
    setCompare([])
  }

  return (
    <CompareContext.Provider
      value={{
        compare,
        addToCompare,
        removeToCompare,
        clearCompare,
        isInCompare,
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
    </CompareContext.Provider>
  )
}