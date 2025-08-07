import { deleteOrder } from '../services/api'

const OrderItem = ({ order, onEdit, onOrderDeleted }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(order._id)
        onOrderDeleted()
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    }
  }

  const statusClass = 
    order.orderStatus === 'Yet to Pack' ? 'status-processing' :
    order.orderStatus === 'Delivered' ? 'status-delivered' :
    'status-pending'

  return (
    <div className="order">
      <div className="order-actions">
        <button className="btn btn-success" onClick={() => onEdit(order)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="order-content">
        <div className="order-header">
          <h3 className="order-title">{order.customerName}</h3>
          <span className={`order-status ${statusClass}`}>{order.orderStatus}</span>
        </div>
        
        <div className="order-details">
          <p><strong>Payment:</strong> {order.paymentMode}</p>
          <p><strong>Address:</strong> {order.address}</p>
        </div>
        
        <div className="order-products">
          {order.products.map((p, index) => (
            <div key={index} className="order-product">
              {p.name} - ₹{p.price} × {p.qty} = ₹{p.price * p.qty}
            </div>
          ))}
        </div>
        
        {order.customization && (
          <div className="customization">
            <strong>Customization:</strong> {order.customization}
          </div>
        )}
        
        <p className="order-total">Total: ₹{order.total}</p>
      </div>
    </div>
  )
}

export default OrderItem