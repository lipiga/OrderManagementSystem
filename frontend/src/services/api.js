import axios from 'axios'

const API_URL = 'https://ordermanagementsystem-backend.onrender.com/api/orders'

export const createOrder = (orderData) => axios.post(API_URL, orderData)
export const getOrders = () => axios.get(API_URL)
export const getOrderById = (id) => axios.get(`${API_URL}/${id}`)
export const updateOrder = (id, orderData) => axios.put(`${API_URL}/${id}`, orderData)
export const deleteOrder = (id) => axios.delete(`${API_URL}/${id}`)
