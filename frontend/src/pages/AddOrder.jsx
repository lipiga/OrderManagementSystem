import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import OrderForm from '../components/OrderForm'
import { createOrder, updateOrder, getOrderById } from '../services/api'

const AddOrder = () => {
  const [orderToEdit, setOrderToEdit] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrderToEdit = async () => {
      const orderId = searchParams.get('edit')
      if (orderId) {
        try {
          const response = await getOrderById(orderId)
          setOrderToEdit(response.data)
        } catch (error) {
          console.error('Error fetching order:', error)
        }
      }
    }
    
    fetchOrderToEdit()
  }, [searchParams])

  const handleOrderSaved = () => {
    setOrderToEdit(null)
    navigate('/orders')
  }

  const handleCancelEdit = () => {
    setOrderToEdit(null)
    navigate('/')
  }

 return (
    <div className="form-page">
      <h1>{orderToEdit ? 'Edit Order' : 'Add New Order'}</h1>
      <OrderForm
        orderToEdit={orderToEdit}
        onOrderSaved={handleOrderSaved}
        onCancel={handleCancelEdit}
      />
    </div>
  )
}

export default AddOrder