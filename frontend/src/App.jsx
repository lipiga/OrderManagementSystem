import React, { useEffect, useState } from "react";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "./api";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({});
  const [editingOrder, setEditingOrder] = useState(null);

  async function load() {
    try {
      const data = await fetchOrders(filters);
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    }
  }

  useEffect(() => { 
    load(); 
  }, [filters]);

  async function handleCreate(order) {
    await createOrder(order);
    await load();
  }

  async function handleUpdate(id, order) {
    await updateOrder(id, order);
    setEditingOrder(null);
    await load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this order?")) return;
    await deleteOrder(id);
    await load();
  }

  function handleFilterChange(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: value === "all" ? undefined : value
    }));
  }

  const totalPlaced = orders.reduce((s, o) => s + (o.totalAmount||0), 0);
  const totalReceived = orders.reduce((s, o) => s + ((o.paymentStatus === "paid") ? (o.totalAmount||0) : 0), 0);

  return (
    <div className="order-manager">
      <div className="container">
        <h1 className="app-title">Order Management</h1>

        {/* Order Summary Section - Full Width */}
        <div className="summary-section">
          <h2 className="section-title">Orders Summary</h2>
          <div className="summary-content">
            <div className="summary-stats">
              <div className="stat-item">
                <span>Total amount placed:</span>
                <strong>₹{totalPlaced.toFixed(2)}</strong>
              </div>
              <div className="stat-item">
                <span>Amount received:</span>
                <strong>₹{totalReceived.toFixed(2)}</strong>
              </div>
            </div>

            <div className="filters">
              <div className="filter-group">
                <label>Filter by Order Status</label>
                <select
                  onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
                  value={filters.orderStatus || "all"}
                >
                  <option value="all">All</option>
                  <option value="yet to create">yet to create</option>
                  <option value="yet to pack">yet to pack</option>
                  <option value="yet to deliver">yet to deliver</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Filter by Payment Status</label>
                <select
                  onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                  value={filters.paymentStatus || "all"}
                >
                  <option value="all">All</option>
                  <option value="paid">paid</option>
                  <option value="not paid">not paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid - Add Order and Order List */}
        <div className="bottom-grid">
          <div className="form-section">
            <h2 className="section-title">Add Order</h2>
            <OrderForm onSubmit={handleCreate} />
          </div>

          <div className="orders-section">
            <OrderList
              orders={orders}
              onEdit={(o) => setEditingOrder(o)}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        </div>

        {editingOrder && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Edit Order</h3>
              <div className="modal-form-container">
                <OrderForm
                  initial={editingOrder}
                  onSubmit={(data) => handleUpdate(editingOrder._id, data)}
                  onCancel={() => setEditingOrder(null)}
                />
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .order-manager {
            min-height: 100vh;
            background-color: #E8FFD7;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .container {
            margin: 0 auto;
          }
          
          .app-title {
            color: #3E5F44;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 24px;
            text-align: center;
          }
          
          /* Summary Section - Full Width */
          .summary-section {
            background-color: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(62, 95, 68, 0.1);
            margin-bottom: 20px;
          }
          
          .summary-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
          }
          
          .summary-stats {
            display: flex;
            gap: 20px;
          }
          
          /* Bottom Grid Layout */
          .bottom-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          @media (min-width: 768px) {
            .bottom-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          .form-section, .orders-section {
            background-color: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(62, 95, 68, 0.1);
          }
          
          .section-title {
            color: #5E936C;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #E8FFD7;
          }
          
          .stat-item {
            display: flex;
            flex-direction: column;
            font-size: 14px;
            color: #3E5F44;
          }
          
          .stat-item strong {
            color: #3E5F44;
            font-weight: 600;
            font-size: 16px;
          }
          
          .filters {
            display: flex;
            gap: 16px;
          }
          
          .filter-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 180px;
          }
          
          .filter-group label {
            font-size: 13px;
            color: #5E936C;
            font-weight: 500;
          }
          
          select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #93DA97;
            border-radius: 8px;
            background-color: white;
            font-size: 14px;
            color: #3E5F44;
          }
          
          select:focus {
            outline: none;
            border-color: #5E936C;
            box-shadow: 0 0 0 2px rgba(147, 218, 151, 0.2);
          }
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            overflow-y: auto;
          }
          
          .modal-content {
            background-color: white;
            border-radius: 12px;
            width: 100%;
            max-width: 800px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            max-height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          
          .modal-title {
            color: #3E5F44;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 16px;
          }
          
          .modal-form-container {
            overflow-y: auto;
            padding-right: 8px;
          }
          
          @media (max-width: 768px) {
            .app-title {
              font-size: 24px;
            }
            
            .section-title {
              font-size: 16px;
            }
            
            .summary-content {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .summary-stats {
              width: 100%;
              justify-content: space-between;
            }
            
            .filters {
              width: 100%;
              flex-direction: column;
            }
            
            .filter-group {
              width: 100%;
            }
            
            .modal-content {
              max-height: 85vh;
              padding: 16px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}