import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddOrder from './pages/AddOrder'
import OrdersList from './pages/OrdersList'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-link">Add Order</Link>
          <Link to="/orders" className="nav-link">View Orders</Link>
        </nav>
        
        <div className="main-container">
          <Routes>
            <Route path="/" element={<AddOrder />} />
            <Route path="/orders" element={<OrdersList />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App