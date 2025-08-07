import OrderItem from './OrderItem'

const OrderList = ({ orders, onEdit, onOrderDeleted }) => {
  return (
    <div className="card">
      <h2>Order List</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
          No orders found. Add your first order above.
        </p>
      ) : (
        orders.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
            onEdit={onEdit}
            onOrderDeleted={onOrderDeleted}
          />
        ))
      )}
    </div>
  )
}

export default OrderList