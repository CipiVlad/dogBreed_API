import BreedList from "./components/BreedList"
import { Routes, Route } from "react-router-dom"
import BreedDetail from "./pages/BreedDetail"
import SelectedBreedGallery from './pages/SelectedBreedGallery'
import PageNotFound from "./pages/404"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BreedList />} />
        <Route path="/breed/:hound" element={<BreedDetail />} />
        <Route path="/gallery" element={<SelectedBreedGallery />} />
      </Routes>
    </>
  )
}

export default App

