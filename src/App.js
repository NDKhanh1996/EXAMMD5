import './App.css';
import TourListTable from "./components/tourList/tourList"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TourInfo from "./components/info"
import Add from "./components/addtour"
import Delete from "./components/delete"
import Edit from "./components/edit"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TourListTable />} />
        <Route path="/tour/:tourId" element={<TourInfo />} />
        <Route path="/add" element={<Add />} />
        <Route path="/delete/:tourId" element={<Delete />} />
        <Route path="/edit/:tourId" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
