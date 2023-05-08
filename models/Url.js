import mongoose from "mongoose";
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  name: String,
  module: String,
  identifier: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Url", urlSchema);
