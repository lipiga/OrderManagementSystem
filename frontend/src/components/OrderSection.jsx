import OrderItem from './OrderItem'

const OrderSection = ({ orders, onOrderUpdated }) => {
  return (
    <div className="order-section">
      {orders.length === 0 ? (
        <p className="no-orders">No orders in this category</p>
      ) : (
        orders.map(order => (
          <OrderItem
            key={order._id}
            order={order}
            onOrderUpdated={onOrderUpdated}
          />
        ))
      )}
    </div>
  )
}

export default OrderSection