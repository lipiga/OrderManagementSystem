import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddOrder from './pages/AddOrder'
import OrdersList from './pages/OrdersList'
import YetToCreate from './pages/YetToCreate'
import YetToPack from './pages/YetToPack'
import YetToDeliver from './pages/YetToDeliver'
import Delivered from './pages/Delivered'
import './App.css'

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Add Order</Link>
        <Link to="/orders" className="nav-link">All Orders</Link>
        <Link to="/yet-to-create" className="nav-link">To Create</Link>
        <Link to="/yet-to-pack" className="nav-link">To Pack</Link>
        <Link to="/yet-to-deliver" className="nav-link">To Deliver</Link>
        <Link to="/delivered" className="nav-link">Delivered</Link>
      </nav>
      
      <div className="main-container">
        <Routes>
          <Route path="/" element={<AddOrder />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/yet-to-create" element={<YetToCreate />} />
          <Route path="/yet-to-pack" element={<YetToPack />} />
          <Route path="/yet-to-deliver" element={<YetToDeliver />} />
          <Route path="/delivered" element={<Delivered />} />
          <Route path="*" element={<AddOrder />} /> {/* Fallback route */}
        </Routes>
      </div>
    </Router>
  )
}

export default App