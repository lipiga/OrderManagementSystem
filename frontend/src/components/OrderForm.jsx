import { useState, useEffect } from 'react'
import { createOrder, updateOrder } from '../services/api'

const OrderForm = ({ orderToEdit, onOrderSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    paymentMode: 'GPay',
    products: '',
    address: '',
    customization: '',
    orderStatus: 'Yet to Create'
  })

  useEffect(() => {
    if (orderToEdit) {
      setFormData({
        customerName: orderToEdit.customerName,
        paymentMode: orderToEdit.paymentMode,
        products: orderToEdit.products.map(p => `${p.name}|${p.price}|${p.qty}`).join(', '),
        address: orderToEdit.address,
        customization: orderToEdit.customization || '',
        orderStatus: orderToEdit.orderStatus
      })
    }
  }, [orderToEdit])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const parseProducts = (input) => {
    return input.split(',').map(item => {
      const [name, price, qty] = item.trim().split('|')
      return { 
        name: name.trim(), 
        price: parseFloat(price.trim()), 
        qty: parseInt(qty.trim()) 
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const products = parseProducts(formData.products)
      const orderData = { ...formData, products }
      
      if (orderToEdit) {
        await updateOrder(orderToEdit._id, orderData)
      } else {
        await createOrder(orderData)
      }
      
      onOrderSaved()
      setFormData({
        customerName: '',
        paymentMode: 'GPay',
        products: '',
        address: '',
        customization: '',
        orderStatus: 'Yet to Create'
      })
    } catch (error) {
      console.error('Error saving order:', error)
    }
  }

  return (
    <div className="card" style={{ width: '100%' }}>
      <h2>{orderToEdit ? 'Edit Order' : 'Create New Order'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="paymentMode">Payment Mode</label>
          <select
            id="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
          >
            <option value="GPay">GPay</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="products">Products (format: name|price|quantity, separate with commas)</label>
          <textarea
            id="products"
            value={formData.products}
            onChange={handleChange}
            placeholder="e.g. Apple|30|2, Banana|10|5"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Shipping Address</label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="customization">Customization Details</label>
          <textarea
            id="customization"
            value={formData.customization}
            onChange={handleChange}
            placeholder="Any special instructions or customizations"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="orderStatus">Order Status</label>
          <select
            id="orderStatus"
            value={formData.orderStatus}
            onChange={handleChange}
            required
          >
            <option value="Yet to Create">Yet to Create</option>
            <option value="Yet to Pack">Yet to Pack</option>
            <option value="Yet to Deliver">Yet to Deliver</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          {orderToEdit ? 'Update Order' : 'Save Order'}
        </button>
        {orderToEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

export default OrderForm