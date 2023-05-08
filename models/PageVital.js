import mongoose from "mongoose";
const Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;
const pageVital = new Schema({
  testUrl: String,
  PerformanceScore: String,
  TBT: Number,
  labLCP: Number,
  labFCP: Number,
  labCLS: Number,
  labMaxFID: Number,
  TTFB: Number,
  TTI: Number,
  pageSize: Number,
  speedIndex: Number,
  firstPartyJSResource: Number,
  firstPartyJSTransfer: Number,
  thirdPartyJSTransfer: Number,
  thirdPartyJSResource: Number,
  date: String,
  benchmarkIndex: String,
  device: String,
  lighthouseResponse : String,
  fieldFCP: Number,
  fieldFID: Number,
  fieldLCP: Number,
  fieldCLS: Number,
  fieldTTI: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PageVital", pageVital);
