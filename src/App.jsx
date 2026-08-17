import { BrowserRouter, Routes , Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import FavoritePage from "./pages/FavoritePage"
import ComparePage from "./pages/ComparePage"

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/products/:id" element={<DetailsPage/>}/>
      <Route path="/favorite" element={<FavoritePage/>}/>
      <Route path="/compare" element={<ComparePage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
