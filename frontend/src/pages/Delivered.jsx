import { useState, useEffect } from 'react'
import OrderSection from '../components/OrderSection'
import { getOrders } from '../services/api'

const Delivered = () => {
  const [orders, setOrders] = useState([])
  const [totalTurnover, setTotalTurnover] = useState(0)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      const deliveredOrders = response.data.filter(o => o.orderStatus === 'Delivered')
      setOrders(deliveredOrders)
      
      // Calculate turnover
      const turnover = deliveredOrders.reduce((sum, order) => sum + order.total, 0)
      setTotalTurnover(turnover)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Delivered Orders</h1>
        <div className="turnover-box">
          <span className="turnover-label">Turnover:</span>
          <span className="turnover-amount">₹{totalTurnover.toFixed(2)}</span>
        </div>
      </div>
      <OrderSection 
        orders={orders}
        onOrderUpdated={fetchOrders}
      />
    </div>
  )
}

export default Delivered