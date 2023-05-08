// const { Double } = require("bson");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pageVitalComputed = new Schema({
  testUrl: String,
  PerformanceScore: Number,
  labLCP: Number,
  labFCP: Number,
  TTFB: Number,
  TTI: Number,
  TBT: Number,
  pageSize: Number,
  labMaxFID: Number,
  speedIndex: Number,
  date: String,
  calculationLogic: String,
  device: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PageVitalComputed", pageVitalComputed);
