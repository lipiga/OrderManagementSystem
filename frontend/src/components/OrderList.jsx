import React from "react";

export default function OrderList({ orders, onEdit, onDelete }) {
  if (!orders?.length) return <div className="empty-state">No orders yet.</div>;

  return (
    <div className="order-list">
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <div className="order-main">
            <div className="order-header">
              <div className="customer-info">
                <h3 className="customer-name">{order.customerName}</h3>
                <div className="order-date">
                  Placed: {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="order-status">
                <div>Status: <span className="status-value">{order.orderStatus}</span></div>
                <div>Payment: <span className="status-value">{order.paymentStatus}</span></div>
                <div>Mode: {order.paymentMode}</div>
              </div>
            </div>

            <div className="order-details">
              <h4 className="section-title">Products:</h4>
              <ul className="product-list">
                {order.products.map((p, idx) => (
                  <li key={idx} className="product-item">
                    <span className="product-name">{p.name}</span> — 
                    <span className="product-price">₹{p.price}</span> × 
                    <span className="product-qty">{p.qty}</span> = 
                    <span className="product-total">₹{(p.price*p.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {order.customization && (
                <div className="customization">
                  <span className="detail-label">Customization:</span> {order.customization}
                </div>
              )}
              
              {order.address && (
                <div className="address">
                  <span className="detail-label">Address:</span> {order.address}
                </div>
              )}
            </div>
          </div>

          <div className="order-actions">
            <div className="order-total">₹{(order.totalAmount||0).toFixed(2)}</div>
            <div className="action-buttons">
              <button onClick={() => onEdit(order)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => onDelete(order._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>

          <style jsx>{`
            .order-list {
              display: grid;
              gap: 16px;
              padding: 8px;
            }
            
            .empty-state {
              text-align: center;
              padding: 40px;
              color: #5E936C;
              font-size: 18px;
              background-color: #E8FFD7;
              border-radius: 8px;
            }
            
            .order-card {
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(62, 95, 68, 0.1);
              display: flex;
              flex-direction: column;
            }
            
            @media (min-width: 768px) {
              .order-card {
                flex-direction: row;
              }
            }
            
            .order-main {
              flex: 1;
              padding: 16px;
            }
            
            .order-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 12px;
              padding-bottom: 12px;
              border-bottom: 1px solid #E8FFD7;
            }
            
            .customer-name {
              color: #3E5F44;
              margin: 0;
              font-size: 18px;
              font-weight: 600;
            }
            
            .order-date {
              color: #5E936C;
              font-size: 12px;
              margin-top: 4px;
            }
            
            .order-status {
              text-align: right;
              font-size: 13px;
              color: #5E936C;
            }
            
            .status-value {
              font-weight: 500;
              color: #3E5F44;
            }
            
            .section-title {
              color: #5E936C;
              font-size: 14px;
              margin: 8px 0 4px;
              font-weight: 500;
            }
            
            .product-list {
              margin: 0;
              padding-left: 18px;
            }
            
            .product-item {
              margin-bottom: 4px;
              font-size: 13px;
              color: #3E5F44;
            }
            
            .product-name {
              font-weight: 500;
            }
            
            .product-price, .product-qty {
              font-weight: 500;
              color: #5E936C;
            }
            
            .product-total {
              font-weight: 600;
              color: #3E5F44;
            }
            
            .customization, .address {
              margin-top: 8px;
              font-size: 13px;
              color: #3E5F44;
            }
            
            .detail-label {
              font-weight: 500;
              color: #5E936C;
            }
            
            .order-actions {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-end;
              padding: 16px;
              background-color: #F8FFF3;
              border-top: 1px solid #E8FFD7;
            }
            
            @media (min-width: 768px) {
              .order-actions {
                width: 180px;
                border-top: none;
                border-left: 1px solid #E8FFD7;
              }
            }
            
            .order-total {
              font-size: 20px;
              font-weight: 600;
              color: #3E5F44;
              margin-bottom: 12px;
            }
            
            .action-buttons {
              display: flex;
              gap: 8px;
            }
            
            button {
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
            }
            
            .edit-btn {
              background-color: #93DA97;
              color: white;
              border: none;
            }
            
            .edit-btn:hover {
              background-color: #5E936C;
            }
            
            .delete-btn {
              background-color: white;
              color: #e74c3c;
              border: 1px solid #ffcdd2;
            }
            
            .delete-btn:hover {
              background-color: #ffebee;
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}