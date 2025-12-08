import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // e.g., 'credit', 'debit'
  timestamp: { type: Date, default: Date.now }
});