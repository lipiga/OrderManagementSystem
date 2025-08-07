import axios from 'axios'

const API_URL = 'http://localhost:5000/api/orders'

export const createOrder = (orderData) => axios.post(API_URL, orderData)
export const getOrders = () => axios.get(API_URL)
export const updateOrder = (id, orderData) => axios.put(`${API_URL}/${id}`, orderData)
export const deleteOrder = (id) => axios.delete(`${API_URL}/${id}`)