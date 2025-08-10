import React, { useEffect, useState } from "react";

const emptyProduct = () => ({ name: "", price: 0, qty: 1 });

export default function OrderForm({ onSubmit, initial = null, onCancel }) {
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState([emptyProduct()]);
  const [customization, setCustomization] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0,16));
  const [paymentMode, setPaymentMode] = useState("gpay");
  const [orderStatus, setOrderStatus] = useState("yet to create");
  const [paymentStatus, setPaymentStatus] = useState("not paid");

  useEffect(() => {
    if (initial) {
      setCustomerName(initial.customerName || "");
      setProducts(initial.products.length ? initial.products : [emptyProduct()]);
      setCustomization(initial.customization || "");
      setAddress(initial.address || "");
      setCreatedAt(new Date(initial.createdAt).toISOString().slice(0,16));
      setPaymentMode(initial.paymentMode || "gpay");
      setOrderStatus(initial.orderStatus || "yet to create");
      setPaymentStatus(initial.paymentStatus || "not paid");
    } else {
      // reset
      setCustomerName("");
      setProducts([emptyProduct()]);
      setCustomization("");
      setAddress("");
      setCreatedAt(new Date().toISOString().slice(0,16));
      setPaymentMode("gpay");
      setOrderStatus("yet to create");
      setPaymentStatus("not paid");
    }
  }, [initial]);

  function changeProduct(i, field, value) {
    const copy = products.map((p, idx) => idx === i ? {...p, [field]: field === "name" ? value : Number(value)} : p);
    setProducts(copy);
  }

  function addProduct() {
    setProducts(p => [...p, emptyProduct()]);
  }

  function removeProduct(i) {
    setProducts(p => p.filter((_, idx) => idx !== i));
  }

  function calcTotal() {
    return products.reduce((s,p) => s + (Number(p.price||0) * Number(p.qty||0)), 0);
  }

  async function submit(e) {
    e.preventDefault();
    if (!customerName.trim()) return alert("Customer name required");
    const payload = {
      customerName,
      products: products.filter(p => p.name.trim()),
      customization,
      address,
      createdAt: new Date(createdAt).toISOString(),
      paymentMode,
      orderStatus,
      paymentStatus
    };
    await onSubmit(payload);
    if (!initial) {
      setCustomerName("");
      setProducts([emptyProduct()]);
      setCustomization("");
      setAddress("");
      setCreatedAt(new Date().toISOString().slice(0,16));
      setPaymentMode("gpay");
      setOrderStatus("yet to create");
      setPaymentStatus("not paid");
    }
  }

  return (
    <form onSubmit={submit} className="order-form">
      <h2 className="form-title">{initial ? "Edit Order" : "Create New Order"}</h2>
      
      <div className="form-group">
        <label>Customer Name</label>
        <input 
          value={customerName} 
          onChange={e => setCustomerName(e.target.value)} 
          placeholder="Enter customer name"
        />
      </div>

      <div className="form-group">
        <label>Products</label>
        <div className="products-container">
          {products.map((p, i) => (
            <div key={i} className="product-row">
              <input 
                placeholder="Product name"
                value={p.name} 
                onChange={e => changeProduct(i, "name", e.target.value)} 
              />
              <input 
                type="number" 
                min="0"
                value={p.price} 
                onChange={e => changeProduct(i, "price", e.target.value)} 
                placeholder="Price" 
              />
              <input 
                type="number" 
                min="1"
                value={p.qty} 
                onChange={e => changeProduct(i, "qty", e.target.value)} 
                placeholder="Qty" 
              />
              <div className="product-actions">
                <button type="button" className="btn-add" onClick={addProduct}>
                  <span>+</span> Add
                </button>
                {products.length > 1 && (
                  <button type="button" className="btn-remove" onClick={() => removeProduct(i)}>
                    <span>-</span>
                  </button>
                )}
                <div className="product-total">₹{(p.price * p.qty).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Customization Notes</label>
        <textarea 
          value={customization} 
          onChange={e => setCustomization(e.target.value)} 
          placeholder="Any special instructions..."
        />
      </div>

      <div className="form-group">
        <label>Delivery Address</label>
        <input 
          value={address} 
          onChange={e => setAddress(e.target.value)} 
          placeholder="Enter delivery address"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Order Date & Time</label>
          <input 
            type="datetime-local" 
            value={createdAt} 
            onChange={e => setCreatedAt(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select 
            value={paymentMode} 
            onChange={e => setPaymentMode(e.target.value)}
          >
            <option value="gpay">GPay</option>
            <option value="cash">Cash</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Order Status</label>
          <select 
            value={orderStatus} 
            onChange={e => setOrderStatus(e.target.value)}
          >
            <option>yet to create</option>
            <option>yet to pack</option>
            <option>yet to deliver</option>
            <option>delivered</option>
          </select>
        </div>
        <div className="form-group">
          <label>Payment Status</label>
          <select 
            value={paymentStatus} 
            onChange={e => setPaymentStatus(e.target.value)}
          >
            <option value="not paid">not paid</option>
            <option value="paid">paid</option>
          </select>
        </div>
      </div>

      <div className="form-footer">
        <div className="total-amount">
          Total: <strong>₹{calcTotal().toFixed(2)}</strong>
        </div>
        <div className="action-buttons">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          )}
          <button type="submit" className="btn-submit">
            {initial ? "Update Order" : "Create Order"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .order-form {
          max-width: 800px;
          margin: 0 auto;
          padding: 25px;
          background-color: #E8FFD7;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(62, 95, 68, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .form-title {
          color: #3E5F44;
          text-align: center;
          margin-bottom: 25px;
          font-size: 24px;
          font-weight: 600;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #3E5F44;
          font-weight: 500;
          font-size: 14px;
        }
        
        input, textarea, select {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #93DA97;
          border-radius: 8px;
          background-color: white;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #5E936C;
          box-shadow: 0 0 0 2px rgba(93, 218, 151, 0.2);
        }
        
        textarea {
          min-height: 80px;
          resize: vertical;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .products-container {
          border-radius: 8px;
          overflow: hidden;
        }
        
        .product-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 10px;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #93DA97;
        }
        
        .product-row:last-child {
          border-bottom: none;
        }
        
        .product-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }
        
        .product-total {
          font-size: 14px;
          font-weight: 500;
          color: #3E5F44;
          min-width: 70px;
          text-align: right;
        }
        
        button {
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .btn-add {
          background-color: #93DA97;
          color: white;
          border: none;
        }
        
        .btn-add:hover {
          background-color: #5E936C;
        }
        
        .btn-add span {
          font-weight: bold;
        }
        
        .btn-remove {
          background-color: #ffebee;
          color: #f44336;
          border: 1px solid #ffcdd2;
          padding: 8px 12px;
        }
        
        .btn-remove:hover {
          background-color: #ffcdd2;
        }
        
        .btn-remove span {
          font-weight: bold;
        }
        
        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #93DA97;
        }
        
        .total-amount {
          font-size: 18px;
          color: #3E5F44;
        }
        
        .total-amount strong {
          font-size: 20px;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        
        .btn-cancel {
          background-color: white;
          color: #5E936C;
          border: 1px solid #5E936C;
        }
        
        .btn-cancel:hover {
          background-color: #f5f5f5;
        }
        
        .btn-submit {
          background-color: #5E936C;
          color: white;
          border: none;
          padding: 10px 20px;
        }
        
        .btn-submit:hover {
          background-color: #3E5F44;
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .product-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .product-actions {
            justify-content: flex-end;
          }
        }
      `}</style>
    </form>
  );
}