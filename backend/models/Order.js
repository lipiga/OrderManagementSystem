import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 0 }
});

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  products: { type: [ProductSchema], default: [] },
  customization: { type: String, default: "" },
  address: { type: String, default: "" },
  createdAt: { type: Date, default: () => new Date() },
  paymentMode: { type: String, enum: ["gpay", "cash"], default: "cash" },
  orderStatus: {
    type: String,
    enum: ["yet to create", "yet to pack", "yet to deliver", "delivered"],
    default: "yet to create"
  },
  paymentStatus: { type: String, enum: ["paid", "not paid"], default: "not paid" },
  totalAmount: { type: Number, default: 0 }
});

// Compute total before save
OrderSchema.pre("save", function (next) {
  this.totalAmount = this.products.reduce((s, p) => s + (p.price * p.qty), 0);
  next();
});

// Also update total on updateOne/findOneAndUpdate flows by middleware
OrderSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update?.products) {
    const total = update.products.reduce((s, p) => s + (p.price * p.qty), 0);
    update.totalAmount = total;
    this.setUpdate(update);
  }
  next();
});

export default mongoose.model("OrderWeavenKnits", OrderSchema);
