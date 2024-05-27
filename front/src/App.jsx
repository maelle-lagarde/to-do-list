import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import './App.css'

export default function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/add-task" element={<AddTask/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}