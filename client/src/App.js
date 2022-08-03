import React from "react";
import { Home } from "./components/Home/Home.js"
import { Login } from "./components/Login/Login.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

// 1:57:12
export default App