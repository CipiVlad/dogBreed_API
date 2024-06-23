
import React from 'react'
import BreedList from "./components/BreedList"
import { Router, Routes, Route } from "react-router-dom"
import BreedDetail from "./pages/BreedDetail"
import SelectedBreedGallery from './pages/SelectedBreedGallery'



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

