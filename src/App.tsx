import BreedList from "./components/BreedList"
import { Router, Routes, Route } from "react-router-dom"
import BreedDetail from "./pages/BreedDetail"

function App() {

  return (

    <Routes>
      <Route path="/" element={<BreedList />} />
      <Route path="/breed/:hound" element={<BreedDetail />} />
    </Routes>

  )
}

export default App
