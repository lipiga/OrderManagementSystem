import { useState, useEffect } from 'react'
import OrderSection from '../components/OrderSection'
import { getOrders } from '../services/api'

const OrdersList = () => {
  const [orders, setOrders] = useState([])
  const [totalTurnover, setTotalTurnover] = useState(0)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data)
      
      // Calculate total turnover from delivered orders
      const deliveredOrders = response.data.filter(o => o.orderStatus === 'Delivered')
      const turnover = deliveredOrders.reduce((sum, order) => sum + order.total, 0)
      setTotalTurnover(turnover)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const statusCategories = [
    { status: 'Yet to Create', title: 'Orders to Create' },
    { status: 'Yet to Pack', title: 'Orders to Pack' },
    { status: 'Yet to Deliver', title: 'Orders to Deliver' },
    { status: 'Delivered', title: 'Delivered Orders' }
  ]

  return (
    <>
      <h1>Order Management</h1>
      <div className="turnover-display">
        <h3>Total Turnover: ₹{totalTurnover.toFixed(2)}</h3>
      </div>
      
      <div className="order-sections-container">
        {statusCategories.map(category => (
          <OrderSection
            key={category.status}
            title={category.title}
            orders={orders.filter(o => o.orderStatus === category.status)}
            onOrderUpdated={fetchOrders}
          />
        ))}
      </div>
    </>
  )
}

export default OrdersList