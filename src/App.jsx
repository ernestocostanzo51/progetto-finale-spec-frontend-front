import { BrowserRouter, Routes , Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import FavoritePage from "./pages/FavoritePage"
import ComparePage from "./pages/ComparePage"
import LayOut from "./layout/LayOut"
import GameProvider from "./components/GamesProvider"
import FavoriteProvider from "./components/FavoriteProvider"
import CompareProvider from "./components/CompareProvider"
import SearchProvider from "./components/SearchProvider"
import SortProvider from "./components/SortProvider"

function App() {
  

  return (
    <>
    <SortProvider>
<SearchProvider>
       <CompareProvider>
<FavoriteProvider>
       <GameProvider>
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
    </GameProvider>
    </FavoriteProvider>
    </CompareProvider>
    </SearchProvider>
    </SortProvider>
    
   
    
   
    
    </>
  )
}

export default App
