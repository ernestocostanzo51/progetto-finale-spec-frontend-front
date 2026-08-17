import { BrowserRouter, Routes , Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import FavoritePage from "./pages/FavoritePage"
import ComparePage from "./pages/ComparePage"
import LayOut from "./layout/LayOut"


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<LayOut/>}>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/products/:id" element={<DetailsPage/>}/>
      <Route path="/favorite" element={<FavoritePage/>}/>
      <Route path="/compare" element={<ComparePage/>}/>
      </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
