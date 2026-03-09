import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import Hrdashboard from "./components/Hrcomponents/Hrdashboard";
import './App.css'
import BookCab from "./components/Hrcomponents/BookCab";
import Mybookings from "./components/Hrcomponents/Mybookings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/hr-dashboard" element={<Hrdashboard/>}/>
          <Route path="/BookCab" element={<BookCab/>}/>
          <Route path="/MyBookings" element={<Mybookings/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/reg" element={<Registration />} />
          <Route path="/log" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;