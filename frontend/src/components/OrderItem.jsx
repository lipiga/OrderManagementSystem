import { deleteOrder } from '../services/api'
import { useNavigate } from 'react-router-dom'

const OrderItem = ({ order, onOrderUpdated }) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(order._id)
        onOrderUpdated()
      } catch (error) {
        console.error('Error deleting order:', error)
      }
    }
  }

  const handleEdit = () => {
    navigate(`/?edit=${order._id}`)
  }

  const statusClass =
    order.orderStatus === 'Yet to Pack' ? 'status-processing' :
      order.orderStatus === 'Delivered' ? 'status-delivered' :
        'status-pending'

return (
    <div className="order">
      <div className="order-actions">
        <button className="btn btn-success" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="order-content">
        <div className="order-header">
          <h3 className="order-title">{order.customerName}</h3>
          <span className={`order-status ${statusClass}`}>
            {order.orderStatus}
          </span>
        </div>
        
        <div className="order-products">
          {order.products.slice(0, 3).map((p, index) => (
            <div key={index} className="order-product">
              {p.name} (₹{p.price} × {p.qty})
            </div>
          ))}
          {order.products.length > 3 && (
            <div className="order-product">
              +{order.products.length - 3} more...
            </div>
          )}
        </div>
        
        <p className="order-total">Total: ₹{order.total.toFixed(2)}</p>
        
        {order.customization && (
          <div className="customization">
            <strong>Note:</strong> {order.customization}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderItem