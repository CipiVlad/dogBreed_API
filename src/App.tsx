import BreedList from "./components/BreedList"
import { Routes, Route } from "react-router-dom"
import BreedDetail from "./pages/BreedDetail"
import SelectedBreedGallery from './pages/SelectedBreedGallery'
import PageNotFound from "./pages/404"
import ScrollTop from "./components/ScrollTop"
import Fab from '@mui/material/Fab'; // Importiere Floating Action Button
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Importiere das Icon


function App() {
  return (
    <>
      {/* anker to top */}
      <div id="back-to-top-anchor"></div>
      <Routes>
        <Route path="/" element={<BreedList />} />
        <Route path="/breed/:hound" element={<BreedDetail />} />
        <Route path="/gallery" element={<SelectedBreedGallery />} />
      </Routes>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default App

