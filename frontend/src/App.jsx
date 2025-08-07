import { useState, useEffect } from 'react'
import OrderForm from './components/OrderForm.jsx'
import OrderList from './components/OrderList.jsx'
import { getOrders } from './services/api'
import './App.css'

function App() {
  const [orders, setOrders] = useState([])
  const [orderToEdit, setOrderToEdit] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleOrderSaved = () => {
    setOrderToEdit(null)
    fetchOrders()
  }

  const handleOrderDeleted = () => {
    fetchOrders()
  }

  const handleEdit = (order) => {
    setOrderToEdit(order)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setOrderToEdit(null)
  }

  return (
    <div className="main-container">
      <h1>Order Management System</h1>
      
      <OrderForm
        orderToEdit={orderToEdit}
        onOrderSaved={handleOrderSaved}
        onCancel={handleCancelEdit}
      />
      
      <OrderList
        orders={orders}
        onEdit={handleEdit}
        onOrderDeleted={handleOrderDeleted}
      />
    </div>
  )
}

export default App