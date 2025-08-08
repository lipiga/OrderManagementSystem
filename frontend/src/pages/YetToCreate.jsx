import { useState, useEffect } from 'react'
import OrderSection from '../components/OrderSection'
import { getOrders } from '../services/api'

const YetToCreate = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data.filter(o => o.orderStatus === 'Yet to Create'))
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  return (
    <div className="orders-page">
      <h1>Orders to Create</h1>
      <OrderSection 
        orders={orders}
        onOrderUpdated={fetchOrders}
      />
    </div>
  )
}

export default YetToCreate